export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body;

  // ✅ Developer/test code: free content
  if (code === "Sahil599") {
    const aiContents = [
      "🔥 AI Viral Content #1",
      "💡 AI Viral Content #2",
      "🚀 AI Viral Content #3"
    ];
    const content = aiContents[Math.floor(Math.random() * aiContents.length)];
    return res.status(200).json({ content });
  }

  // ✅ Normal users must pay $1 first
  // Check if order is approved / paid via PayPal
  const { paymentApproved } = req.body; // sent from frontend after PayPal
  if (!paymentApproved) {
    return res.status(403).json({ error: "Please pay $1 to generate content" });
  }

  // If paid → generate content
  const aiContents = [
    "🔥 AI Viral Content #1",
    "💡 AI Viral Content #2",
    "🚀 AI Viral Content #3"
  ];
  const content = aiContents[Math.floor(Math.random() * aiContents.length)];
  return res.status(200).json({ content });
}
