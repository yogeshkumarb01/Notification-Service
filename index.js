const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();  // Use dotenv for environment variables

const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY || "your-public-vapid-key";
const privateVapidKey = process.env.PRIVATE_VAPID_KEY || "your-private-vapid-key";

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

app.post("/subscribe", async (req, res) => {
  try {
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: "Push Test", body: "This is a test notification from KBTechserver" });

    // Pass object into sendNotification
    await webpush.sendNotification(subscription, payload);
    console.log(" notification service sent successfully");
  } catch (error) {
    console.error("Error sending push notification:", error);
    res.status(500).json({ error: "Error sending push notification" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
