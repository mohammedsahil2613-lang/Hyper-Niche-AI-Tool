export default async function handler(req, res) {
    const { topic } = req.body;

    // Your OpenAI key
    const OPENAI_KEY = process.env.OPENAI_API_KEY || 'test-key';

    // Dummy AI response (replace with OpenAI API if you want)
    res.status(200).json({ content: 'Generated content for topic: ' + topic });
}
