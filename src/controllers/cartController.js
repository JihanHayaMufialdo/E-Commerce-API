const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all carts
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cartItems: {
          select: {
            id: true,
            product: {
                select: {
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

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Add items to cart
const addCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, cartItemQuantity } = req.body;

    let cart = await prisma.cart.findFirst({
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

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Update cart item
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // id cart item
    const { cartItemQuantity } = req.body;

    const updatedItem = await prisma.cartItem.update({
      where: { id: Number(id) },
      data: { cartItemQuantity: Number(cartItemQuantity) },
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

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
