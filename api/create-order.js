export default function handler(req, res) {
    // Dummy order creation (for payment simulation/testing)
    res.status(200).json({ status: 'success', message: 'Order created' });
}
