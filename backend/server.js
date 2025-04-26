import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

// If Node 18+ and "type": "module" in package.json:
import dataJson from "./data.json" assert { type: "json" };

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Copy the data to a variable
let data = dataJson;
if (!data.users) data.users = [];
if (!data.properties) data.properties = [];

// Helper to save to data.json
function saveData() {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2), "utf8");
}

// ---------------------------------------
// Middleware
// ---------------------------------------

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// Admin check middleware
function requireAdmin(req, res, next) {
  const user = data.users.find((u) => u.id === req.user.id);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }
  next();
}

// ---------------------------------------
// AUTHENTICATION
// ---------------------------------------

// Register
app.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;

  console.log("Register endpoint hit");
  console.log("Request body:", req.body);

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const userExists = data.users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    phone: phone || "",
    role: "user",
  };

  data.users.push(newUser);
  saveData();

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);
  res.status(201).json({
    token,
    user: { id: newUser.id, name, email, role: newUser.role },
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = data.users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// Protected user profile
app.get("/profile", authenticateToken, (req, res) => {
  const user = data.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// ---------------------------------------
// USERS (Protected)
// ---------------------------------------
app.get("/users", authenticateToken, requireAdmin, (req, res) => {
  if (!data.users) {
    return res.status(404).json({ error: "Users not found" });
  }
  res.json(data.users);
});

app.post("/users", authenticateToken, requireAdmin, async (req, res) => {
  const newUser = req.body;
  if (!newUser || !newUser.name || !newUser.email || !newUser.password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  newUser.password = await bcrypt.hash(newUser.password, 10);
  newUser.id = uuidv4();
  data.users.push(newUser);
  saveData();
  res
    .status(201)
    .json({ id: newUser.id, name: newUser.name, email: newUser.email });
});

app.put("/users/:id", authenticateToken, (req, res) => {
  // Users can update their own profile, admins can update any
  if (req.user.id !== req.params.id) {
    const adminUser = data.users.find((u) => u.id === req.user.id);

    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Can only update your own profile" });
    }
  }

  const id = req.params.id;
  const updatedUser = req.body;
  const userIndex = data.users.findIndex((u) => u.id == id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Don't allow role changes unless admin
  if (updatedUser.role && req.user.id !== id) {
    const adminUser = data.users.find((u) => u.id === req.user.id);
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ error: "Only admins can change roles" });
    }
  }

  data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };
  saveData();
  res.json(data.users[userIndex]);
});

app.delete("/users/:id", authenticateToken, requireAdmin, (req, res) => {
  const id = req.params.id;
  const userIndex = data.users.findIndex((u) => u.id == id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const deletedUser = data.users.splice(userIndex, 1);
  saveData();
  res.json(deletedUser);
});

// ---------------------------------------
// PROPERTIES (Protected)
// ---------------------------------------
app.get("/properties", (req, res) => {
  if (!data.properties) {
    return res.status(404).json({ error: "Properties not found" });
  }
  res.json(data.properties);
});

app.get("/properties/:id", (req, res) => {
  const id = req.params.id;
  const property = data.properties.find((p) => p.propertyId == id);
  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }
  res.json(property);
});

app.post("/properties", authenticateToken, (req, res) => {
  const newProperty = req.body;
  if (
    !newProperty ||
    !newProperty.propertyId ||
    !newProperty.name ||
    !newProperty.price
  ) {
    return res.status(400).json({ error: "Invalid property data" });
  }

  // Add the user who created the property
  newProperty.createdBy = req.user.id;
  data.properties.push(newProperty);
  saveData();
  res.status(201).json(newProperty);
});

app.put("/properties/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const updatedProperty = req.body;
  const propIndex = data.properties.findIndex((p) => p.propertyId == id);

  if (propIndex === -1) {
    return res.status(404).json({ error: "Property not found" });
  }

  // Only allow updates by creator or admin
  const property = data.properties[propIndex];
  const user = data.users.find((u) => u.id === req.user.id);
  if (property.createdBy !== req.user.id && (!user || user.role !== "admin")) {
    return res
      .status(403)
      .json({ error: "Can only update your own properties" });
  }

  data.properties[propIndex] = { ...property, ...updatedProperty };
  saveData();
  res.json(data.properties[propIndex]);
});

app.delete("/properties/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const propIndex = data.properties.findIndex((p) => p.propertyId == id);
  if (propIndex === -1) {
    return res.status(404).json({ error: "Property not found" });
  }

  // Only allow deletion by creator or admin
  const property = data.properties[propIndex];
  const user = data.users.find((u) => u.id === req.user.id);
  if (property.createdBy !== req.user.id && (!user || user.role !== "admin")) {
    return res
      .status(403)
      .json({ error: "Can only delete your own properties" });
  }

  const deletedProperty = data.properties.splice(propIndex, 1);
  saveData();
  res.json(deletedProperty);
});

// ---------------------------------------
// Start Server
// ---------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
