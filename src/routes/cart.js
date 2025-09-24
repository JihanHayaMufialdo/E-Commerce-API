/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart
 *     description: >
 *       Retrieve the current user's cart with all cart items.
 *       If the cart does not exist, a new one will be created automatically.  
 *       Requires a valid JWT token with USER role.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart
 *       500:
 *         description: Error fetching cart
 */

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Add item to cart
 *     description: >
 *       Add a product to the user's cart.  
 *       If the product already exists in the cart, its quantity will be incremented.  
 *       Requires a valid JWT token with USER role.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - cartItemQuantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               cartItemQuantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart
 *       500:
 *         description: Error adding item to cart
 */

/**
 * @swagger
 * /cart/items/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     description: >
 *       Update the quantity of a specific item in the cart.  
 *       Requires a valid JWT token with USER role.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItemQuantity
 *             properties:
 *               cartItemQuantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cart item updated
 *       500:
 *         description: Error updating cart item
 */

/**
 * @swagger
 * /cart/items/{id}:
 *   delete:
 *     summary: Delete cart item
 *     description: >
 *       Remove an item from the cart by its ID.  
 *       Requires a valid JWT token with USER role.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item
 *     responses:
 *       200:
 *         description: Cart item deleted
 *       500:
 *         description: Error deleting cart item
 */