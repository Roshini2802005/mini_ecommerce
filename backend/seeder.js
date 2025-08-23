// seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import Product from "./models/productModel.js";

// Helpers to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env file
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Load products.json manually
const productsPath = path.join(__dirname, "data", "products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

const seedProducts = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");

    // Clear old data
    await Product.deleteMany();
    console.log("🗑️ Existing products removed");

    // Insert new data
    await Product.insertMany(products);
    console.log("🌱 Products seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Error while seeding:", error.message);
    process.exit(1);
  }
};

seedProducts();
