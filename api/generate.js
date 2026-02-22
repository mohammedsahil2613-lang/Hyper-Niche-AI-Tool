export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, paymentApproved } = req.body;

  // ✅ Test code Sahil599 → free content
  if (code === "Sahil599") {
    const aiContents = [
      "🔥 AI Viral Content #1",
      "💡 AI Viral Content #2",
      "🚀 AI Viral Content #3"
    ];
    const content = aiContents[Math.floor(Math.random() * aiContents.length)];
    return res.status(200).json({ content });
  }

  // ✅ Normal users must pay $1
  if (!paymentApproved) {
    return res.status(403).json({ error: "Please pay $1 to generate content" });
  }

  // ✅ Paid users → generate content
  const aiContents = [
    "🔥 AI Viral Content #1",
    "💡 AI Viral Content #2",
    "🚀 AI Viral Content #3"
  ];
  const content = aiContents[Math.floor(Math.random() * aiContents.length)];
  return res.status(200).json({ content });
}
