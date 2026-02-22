// Simulated AI content generator
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Example AI logic: random content generation
  const aiContents = [
    "AI-generated content #1: Hello, world!",
    "AI-generated content #2: Your daily AI tip!",
    "AI-generated content #3: Creative idea from AI!",
    "AI-generated content #4: Automatic content generation!",
    "AI-generated content #5: Surprise AI content!"
  ];

  // Randomly pick one
  const content = aiContents[Math.floor(Math.random() * aiContents.length)];

  res.status(200).json({ content });
}
