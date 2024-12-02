import Address from "../models/addressSchema.js";
import User from "../models/userSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

export const addAddress = async (req, res, next) => {
  const  user  = req.user;
  const { state, city, pincode, phone_number, full_address, is_default } = req.body;

  try {

    if (is_default) {
      await Address.updateMany(
        { user: user._id },
        { $set: { is_default: false } }
      );
    }

    const newAddress = await Address.create({
      state,
      city,
      pincode,
      phone_number,
      full_address,
      is_default: is_default || false,
      user: user._id,
    });

    // Update user's `addresses` array
    await User.findByIdAndUpdate(
      user._id,
      { $push: { addresses: newAddress._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Address added successfully",
      newAddress,
    });
  } catch (error) {
    return next();
  }
};


// Get All Users Addresses

export const getAllAddresses = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    // Find the user and populate the addresses
    const user = await User.findById(userId).populate("addresses");

    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    // Return the user's addresses
    return res.status(200).json(user.addresses);
  } catch (error) {
    return next(error);
  }
};


// Update Address

export const updateAddress = async (req, res, next) => {
  const { id } = req.params;
  const  user  = req.user;
  const { state, city, pincode, phone_number, full_address, is_default } = req.body;

  try {
    if (is_default) {
      await Address.updateMany(
        { user: user._id },
        { $set: { is_default: false } }
      );
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        state,
        city,
        pincode,
        phone_number,
        full_address,
        is_default: is_default || false,
      },
      { new: true }
    );

    if (!updatedAddress) {
      return next(CustomErrorHandler.notFound("Address not found"));
    }

    return res.status(200).json(updatedAddress);
  } catch (error) {
    return next(error);
  }
};


// Delete Address

export const deleteAddress = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { "addresses": id },
      { $pull: { addresses: id } },
      { new: true }
    );

    if (!user) {
      return next(CustomErrorHandler.notFound("User or address not found"));
    }

    await Address.findByIdAndDelete(id);

    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    return next(error);
  }
};