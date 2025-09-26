/**
 * @swagger
 * /orders/{id}/payment:
 *   post:
 *     summary: Create payment transaction
 *     description: >
 *       Returns a payment `token` and `redirect_url` for testing.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Payment token created
 *         content:
 *           application/json:
 *             example:
 *               message: "Payment token created"
 *               redirect_url: "https://app.sandbox.midtrans.com/snap/v2/vtweb/mock-payment-url"
 *               token: "mock-token-12345"
 *       400:
 *         description: Order must be pending
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
