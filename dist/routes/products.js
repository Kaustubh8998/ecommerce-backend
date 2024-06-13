import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getSingleProduct, getlatestProducts, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
//Create New Product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
//Get all products with filters - /api/v1/product/latest
app.get("/all", getAllProducts);
//Get latest 10 products - /api/v1/product/latest
app.get("/latest", getlatestProducts);
//To get all unique categories - /api/v1/product/categories
app.get("/categories", getAllCategories);
//To get all products - /api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);
app.route("/:id").get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct);
export default app;
