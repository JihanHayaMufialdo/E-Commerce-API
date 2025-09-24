/**
 * @swagger
 * /orders/{id}/payment:
 *   post:
 *     summary: Create payment transaction
 *     description: >
 *       Create a Midtrans Snap payment for an existing order.  
 *       Returns Midtrans `token` and `redirect_url` to complete the payment.
 *       Requires a valid JWT token with USER role.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
 *               redirect_url: "https://app.sandbox.midtrans.com/snap/v2/vtweb/..."
 *               token: "abcd1234xyz"
 *       400:
 *         description: Order must be pending
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */