import Item from "../models/itemSchema.js";
import Cart from "../models/cartSchema.js";

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const product = await Item.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
      await cart.save();
      return res.status(201).json({ message: "Product added to cart", cart });
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.items[existingProductIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    next(error);
  }
};



export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    return next(error);
  }
};


export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params; 
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    cart.items.splice(itemIndex, 1);

    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.status(200).json({ message: "Cart is now empty" });
    }

    await cart.save();

    return res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    return next(error);
  }
};
