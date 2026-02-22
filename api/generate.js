export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // AI logic: Random viral content
  const contents = [
    "🔥 AI Viral Content #1: Boost your engagement!",
    "💡 AI Viral Content #2: Trending idea for social media!",
    "🚀 AI Viral Content #3: Your next viral post!",
    "✨ AI Viral Content #4: Premium AI-generated content!",
    "⚡ AI Viral Content #5: Instant viral content!"
  ];

  const content = contents[Math.floor(Math.random() * contents.length)];

  res.status(200).json({ content });
}
