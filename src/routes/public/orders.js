/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get active orders
 *     description: >
 *       Retrieve all active orders of the logged-in user.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of active orders
 *       500:
 *         description: Error fetching orders
 */

/**
 * @swagger
 * /orders/history:
 *   get:
 *     summary: Get order history
 *     description: >
 *       Retrieve cancelled and delivered orders of the logged-in user.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of historical orders
 *       500:
 *         description: Error fetching order history
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create new order
 *     description: >
 *       Create an order from items in the user's cart or request body.  
 *       This endpoint will check stock availability, calculate total amount, and update product stock.  
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderItems
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - orderItemQuantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     orderItemQuantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Not enough stock
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     description: >
 *       Update the order status to DELIVERED when the order is received.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Invalid value for orderStatus, Order cannot be cancelled
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}/cancel:
 *   delete:
 *     summary: Cancel order
 *     description: >
 *       Cancel a specific order, only if it is still in PENDING status.  
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order cancelled 
 *       400:
 *         description: Invalid value for orderStatus, Order cannot be cancelled
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Get all orders
 *     description: >
 *       Retrieve all orders and orders history from all users.   
 *     tags: [Admin-Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /admin/users/{userId}/orders:
 *   get:
 *     summary: Get orders of a user
 *     description: >
 *       Retrieve all orders of a specific user.  
 *     tags: [Admin-Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Request success
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/users/{userId}/orders/{orderId}:
 *   get:
 *     summary: Get order items of a user
 *     description: >
 *       Retrieve all items of a specific order belonging to a user.
 *     tags: [Admin-Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Request success
 *       403:
 *         description: Unauthorized, Order does not belong to user
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /admin/users/{userId}/orders/{orderId}/status:
 *   put:
 *     summary: Update order status to SHIPPED
 *     description: >
 *       Update an order's status to SHIPPED,  
 *       but only if the order currently has status PAID.  
 *     tags: [Admin-Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Order not eligible for shipping (not PAID)
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
