const express = require("express");
const router = express.Router();
const payOS = require("../modules/payos");
const db = require('../modules/db');

const DOMAIN = "http://localhost:3000"
router.post("/create", async function (req, res) {
  const { description, amountDonate, userId } = req.body;
  const body = {
    orderCode:  Number(`${userId}${Date.now().toString().slice(-6)}`),
    amount: Number(amountDonate), 
    description,
    cancelUrl: `${DOMAIN}/cancel.html`,
    returnUrl: `${DOMAIN}/success.html`
  };

  try {
    const paymentLinkRes = await payOS.createPaymentLink(body);
    console.log("✅ Payment Link Created:", paymentLinkRes);
    return res.redirect(paymentLinkRes.checkoutUrl)
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "fail",
      data: null,
    });
  }
});

router.get("/:userId", async function (req, res) {
  try {
    const userId = req.params.userId
    const [rows] = await db.query(
      'SELECT id_user, SUM(sotien) as total_donated FROM Donaters WHERE id_user = ? GROUP BY id_user',
      [userId]
    );

    return res.json({
      error: 0,
      message: "ok",
      data: rows.length > 0 ? rows[0] : { id_user: userId, total_donated: 0 }
    });

  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "failed",  
      data: null,
    });
  }
});



router.put("/:orderId", async function (req, res) {
  try {
    const { orderId } = req.params;
    const body = req.body;
    const order = await payOS.cancelPaymentLink(orderId, body.cancellationReason);
    if (!order) {
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
    return res.json({
      error: 0,
      message: "ok",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});
//     https://efa9-2405-4802-80d5-7f90-240f-1454-b706-5fba.ngrok-free.app/api/donate/confirm-webhook
router.post("/confirm-webhook", async (req, res) => {
  const { orderCode, amount, description, transactionDateTime } = req.body.data ;

  try {
    // await payOS.confirmWebhook(webhookUrl);
    console.log("web-hook",req.body)
    const userId = await Number(String(orderCode).slice(0, -6));
    console.log(userId, orderCode, amount, transactionDateTime, description)
    await db.query(
      'INSERT INTO Donaters (magiaodich, sotien, ngaydonate, id_user, mota) VALUES (?, ?, ?, ?, ?)',
      [orderCode, amount, transactionDateTime, userId, description]
    );
    
  } catch (error) {
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});

module.exports = router;