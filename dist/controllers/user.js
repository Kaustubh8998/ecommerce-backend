import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
// import { getAuth, deleteUser as deleteFirebaseUser } from "firebase-admin/auth";
export const newUser = TryCatch(async (req, res, next) => {
    // return next(new ErrorHandler("Custom Error", 402))
    const { name, email, photo, gender, _id, dob } = req.body;
    let user = await User.findById(_id);
    if (user)
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
        });
    if (!_id || !name || !email || !photo || !gender || !dob) {
        return next(new ErrorHandler("Please add all Fields", 400));
    }
    user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
    });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
    });
});
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users,
    });
});
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Invalid Id", 400));
    return res.status(200).json({
        success: true,
        user,
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Invalid Id , Can't Delete", 400));
    await user.deleteOne();
    return res.status(200).json({
        success: true,
        message: "User Deleted",
    });
});
// export const deleteUser = TryCatch(async (req, res, next) => {
//   const id = req.params.id;
//   const user = await User.findById(id);
//   if (!user) return next(new ErrorHandler("Invalid Id", 400));
//   // Delete user from Firebase
//   try {
//     await deleteFirebaseUser(id);
//   } catch (error) {
//     return next(new ErrorHandler("Failed to delete user from Firebase", 500));
//   }
//   // Delete user from MongoDB
//   await user.deleteOne();
//   return res.status(200).json({
//     success: true,
//     message: "User Deleted Successfully",
//   });
// });
