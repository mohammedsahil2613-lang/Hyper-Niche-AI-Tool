import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ status: "error", message: "No orderId" });

    const payment = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
      headers: {
        Authorization: "Basic " + Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64")
      }
    }).then(r => r.json());

    if (payment.status === "COMPLETED") {
      res.status(200).json({ status: "success", message: "Payment verified" });
    } else {
      res.status(400).json({ status: "error", message: "Payment not completed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
}
