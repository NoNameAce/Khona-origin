import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

// If Node 18+ and "type": "module" in package.json:
import dataJson from "./data.json" assert { type: "json" };

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Copy the data to a variable
let data = dataJson;

// Helper to save to data.json
function saveData() {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2), "utf8");
}

// ---------------------------------------
// USERS (Optional)
// ---------------------------------------
app.get("/users", (req, res) => {
  if (!data.users) {
    return res.status(404).json({ error: "Users not found" });
  }
  res.json(data.users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  // Check required fields except id, since we'll generate it
  if (!newUser || !newUser.name || !newUser.email) {
    return res.status(400).json({ error: "Invalid user data" });
  }
  // Generate a unique id automatically
  newUser.id = uuidv4();
  data.users.push(newUser);
  saveData();
  res.status(201).json(newUser);
});

// PUT update user by id
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const userIndex = data.users.findIndex((u) => u.id == id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };
  saveData();
  res.json(data.users[userIndex]);
});

// DELETE user by id
app.delete("/users/:id", (req, res) => {
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
// PROPERTIES
// ---------------------------------------

// GET all properties
app.get("/properties", (req, res) => {
  if (!data.properties) {
    return res.status(404).json({ error: "Properties not found" });
  }
  res.json(data.properties);
});

// GET single property by id
app.get("/properties/:id", (req, res) => {
  const id = req.params.id;
  const property = data.properties.find((p) => p.propertyId == id);
  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }
  res.json(property);
});

// POST a new property
app.post("/properties", (req, res) => {
  const newProperty = req.body;
  if (!newProperty || !newProperty.propertyId || !newProperty.name || !newProperty.price) {
    return res.status(400).json({ error: "Invalid property data" });
  }
  data.properties.push(newProperty);
  saveData();
  res.status(201).json(newProperty);
});

// PUT update property by id
app.put("/properties/:id", (req, res) => {
  const id = req.params.id;
  const updatedProperty = req.body;
  const propIndex = data.properties.findIndex((p) => p.propertyId == id);
  if (propIndex === -1) {
    return res.status(404).json({ error: "Property not found" });
  }
  data.properties[propIndex] = { ...data.properties[propIndex], ...updatedProperty };
  saveData();
  res.json(data.properties[propIndex]);
});

// DELETE property by id
app.delete("/properties/:id", (req, res) => {
  const id = req.params.id;
  const propIndex = data.properties.findIndex((p) => p.propertyId == id);
  if (propIndex === -1) {
    return res.status(404).json({ error: "Property not found" });
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
