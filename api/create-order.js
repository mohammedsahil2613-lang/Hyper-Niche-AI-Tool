import fetch from "node-fetch";

const plans = [
  { id: "premium", price: 1, name: "Premium Unlock" }
];

export default async function handler(req, res) {
  try {
    const { planId } = req.body;

    const plan = plans.find(p => p.id === planId);
    if (!plan) return res.status(400).json({ status: "error", message: "Invalid plan" });

    // Create PayPal order
    const order = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64")
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: plan.price.toString() } }]
      })
    }).then(r => r.json());

    res.status(200).json({ status: "success", orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
}
