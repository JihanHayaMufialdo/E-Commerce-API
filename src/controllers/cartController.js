const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await prisma.cart.findFirst({
      where: { userId },
      select: {
        cartItems: {
          select: {
            id: true,
            product: {
                select: {
                    id: true,
                    productName: true,
                    productPrice: true,
                    productStock: true
                }
            },
            cartItemQuantity: true
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { cartItems: true },
      });
    }

    res.json({message: "Request success", cart});
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

const addCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, cartItemQuantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
      },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          cartItemQuantity:
            existingItem.cartItemQuantity + Number(cartItemQuantity),
        },
      });
      return res.json(updatedItem);
    }

    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: Number(productId),
        cartItemQuantity: Number(cartItemQuantity),
      },
    });

    res.status(201).json({message: "Item added to cart", newItem});
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { cartItemQuantity } = req.body;

    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    const cartItem = await prisma.cartItem.findFirst({
      where: {     
        id: Number(id),
        cartId: cart.id, 
      },
    });
    
    if (!cartItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: Number(id)},
      data: { cartItemQuantity: Number(cartItemQuantity) },
    });

    res.json({message: "Cart item updated", updatedItem});
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id

    const cart = await prisma.cart.findFirst({
      where: { userId }
    })

    const cartItem = await prisma.cartItem.findFirst({
      where: {     
        id: Number(id),
        cartId: cart.id, 
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    await prisma.cartItem.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Cart item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item", error });
  }
};

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};
