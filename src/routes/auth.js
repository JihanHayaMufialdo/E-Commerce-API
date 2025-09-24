/**
 * @swagger
 * /register:
 *   post:
 *     summary: User register
 *     description: 
 *       This endpoint allows a new user to create an account. 
 *       The email must be unique. Passwords will be hashed before storing in the database.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: John Doe
 *               userEmail:
 *                 type: string
 *                 example: john@example.com
 *               userPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully, please login
 *       400:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: 
 *       This endpoint allows an existing user to login by providing email and password.
 *       On successful login, a JSON Web Token (JWT) will be returned for authentication.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: user@shop.com
 *               userPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Email not found or password incorrect)
 *       500:
 *         description: Internal server error
 */
