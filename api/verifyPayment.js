export default function handler(req, res) {
    // Dummy payment verification
    res.status(200).json({ status: 'success', message: 'Payment verified' });
}
