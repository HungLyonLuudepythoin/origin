const express = require("express");
const router = express.Router();
const payOS = require("../modules/payos");


const DOMAIN = "http://localhost:3000"
router.post("/create", async function (req, res) {
  const { description, amountDonate } = req.body;
  const body = {
    orderCode: Number(String(new Date().getTime()).slice(-6)),
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

// https://919f-183-80-65-109.ngrok-free.app/confirm-webhook
router.post("/confirm-webhook", async (req, res) => {
  const paymentInfo = res.body()
  const {
    orderCode,
    amount,
    description,
    customerName, // depends on what PayOS sends
    status,
    transactionDateTime
  } = paymentInfo;
  try {
    // await payOS.confirmWebhook(webhookUrl);
    console.log("web-hook",req.body)
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