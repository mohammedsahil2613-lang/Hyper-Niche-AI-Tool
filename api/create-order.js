// Simulated order creation (no keys needed)
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Simulate order creation
  const order = { id: "SIMULATED_ORDER_123" };

  res.status(200).json(order);
}
