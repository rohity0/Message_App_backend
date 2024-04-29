const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_S3_REGION",
});

module.exports = s3;
