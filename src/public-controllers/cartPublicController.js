const getCart = async (req, res) => {
    res.status(200).json({
      message: "Request success",
      cart: {
        cartItems: [
          {
            id: 1,
            product: {
              id: 101,
              productName: "Apple iPhone 14",
              productPrice: 12000000,
              productStock: 15
            },
            cartItemQuantity: 2
          },
          {
            id: 2,
            product: {
              id: 102,
              productName: "Samsung Galaxy S23",
              productPrice: 11000000,
              productStock: 20
            },
            cartItemQuantity: 1
          }
        ]
      }
    });
  };
  
  const addCartItem = async (req, res) => {
    const { productId, cartItemQuantity } = req.body;
    res.status(201).json({
      message: "Item added to cart",
      newItem: {
        id: Math.floor(Math.random() * 1000),
        productId,
        cartItemQuantity
      }
    });
  };
  
  const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { cartItemQuantity } = req.body;
    res.status(200).json({
      message: "Cart item updated",
      updatedItem: {
        id: Number(id),
        cartItemQuantity
      }
    });
  };
  
  const deleteCartItem = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      message: "Cart item deleted",
      deletedId: Number(id)
    });
  };
  
  module.exports = {
    getCart,
    addCartItem,
    updateCartItem,
    deleteCartItem,
  };
  