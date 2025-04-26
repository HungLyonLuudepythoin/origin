const express = require("express");
const router = express.Router();
const payOS = require("../modules/payos");
const db = require('../modules/db');

const HOST = process.env.DOMAIN
router.post("/create", async function (req, res) {
  const { description, amountDonate, userId } = req.body;
  const body = {
    orderCode:  Number(`${userId}${Date.now().toString().slice(-6)}`),
    amount: Number(amountDonate), 
    description,
    cancelUrl: `${HOST}/cancel.html`,
    returnUrl: `${HOST}/success.html`
  };

  try {
    const paymentLinkRes = await payOS.createPaymentLink(body);
    console.log("✅ Payment Link Created:", paymentLinkRes);
    return res.json({
      error: 0,
      message: "success",
      data: {
        checkoutUrl: paymentLinkRes.checkoutUrl
      }
    });
  } catch (error) {
    console.log(error)
    return res.json({
      error: -1,
      message: "fail",
      data: null,
    });
  }
});

router.get("/find", async function (req, res) {
  try {
    const { userId, userName } = req.query; // Retrieve both userId and userName from query parameters
    console.log("Received userId:", userId);
    console.log("Received userName:", userName);

    if (!userId && !userName) {
      return res.json({
        error: -1,
        message: "Either userId or userName is required",
        data: null,
      });
    }

    let query = 'SELECT Don.id_user, ho_ten, magiaodich, sotien, ngaydonate, mota FROM Donaters Don JOIN Users ON Don.id_user = Users.id_user WHERE ';
    let queryParams = [];

    if (userId) {
      query += 'Users.id_user = ?';
      queryParams.push(userId);
      console.log("okk userId")
    }

    if (userName) {
      if (userId) query += ' AND '; // Use 'AND' if userId is already in the query
      query += 'Users.ho_ten LIKE ?';
      queryParams.push(`%${userName}%`);
      console.log("okk userName")
    }

    const [rows] = await db.query(query, queryParams);

    if (rows.length > 0) {
      return res.json({
        error: 0,
        message: "ok",
        data: rows,  // Return all donation records
      });
    } else {
      return res.json({
        error: 0,
        message: "No donations found",
        data: [],  // Return an empty array if no donations exist
      });
    }

  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "Failed to fetch data",  
      data: null,
    });
  }
});

router.get("/topDonaters", async function (req, res) {
  try {
    const [rows] = await db.query(
      'SELECT ho_ten, SUM(sotien) AS total_donated FROM Donaters JOIN Users ON Donaters.id_user = Users.id_user GROUP BY Donaters.id_user ORDER BY total_donated DESC LIMIT 10;'
    )
    return res.json({
      error: 0,
      message: "ok",
      data: rows,  // Return all donation records
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "Failed to fetch data",  
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