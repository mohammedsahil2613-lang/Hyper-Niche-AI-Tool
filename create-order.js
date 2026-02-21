export default function handler(req, res) {
    // Dummy order creation
    res.status(200).json({ status: 'success', message: 'Order created' });
}
