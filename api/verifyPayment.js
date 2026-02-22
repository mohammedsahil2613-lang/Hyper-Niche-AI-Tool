import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { orderID } = req.body;

  try {
    const tokenRes = await axios.post(
      process.env.PAYPAL_MODE === "live"
        ? "https://api-m.paypal.com/v1/oauth2/token"
        : "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_CLIENT_SECRET,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const captureRes = await axios.post(
      process.env.PAYPAL_MODE === "live"
        ? `https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`
        : `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (captureRes.data.status === "COMPLETED") {
      res.status(200).json({ status: "COMPLETED" });
    } else {
      res.status(400).json({ status: "FAILED" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment verification failed" });
  }
}
