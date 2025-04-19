const express = require("express");
const router = express.Router();
const payOS = require("../modules/payos");


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

router.get("/:orderId", async function (req, res) {
  try {
    const order = await payOS.getPaymentLinkInfomation(req.params.orderId);
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
//  https://cc22-2405-4802-80d5-7f90-c965-4640-6fa4-d579.ngrok-free.app/api/confirm-webhook
router.post("/confirm-webhook", async (req, res) => {
  const { orderCode, status, amount, description, transactionDateTime } = req.body.data;
  try {
    // await payOS.confirmWebhook(webhookUrl);
    console.log("web-hook",req.body)
    const userId = Number(String(orderCode).slice(0, -6));
    console.log(userId, orderCode, amount, transactionDateTime, description)
    res.json()
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