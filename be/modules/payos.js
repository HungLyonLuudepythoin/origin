const PayOS = require("@payos/node");
require('dotenv').config();

module.exports = new PayOS(process.env.CLIENT_ID, process.env.API_KEY, process.env.CHECKSUM_KEY);