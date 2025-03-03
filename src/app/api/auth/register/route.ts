// import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}
interface Database {
  data: User[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, confirmPassword } = body;

    if (!name || !email || !password || !phone || !confirmPassword) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match." }, { status: 400 });
    }

    const dbPath = path.join(process.cwd(), "db.json");
    const dbContent = fs.readFileSync(dbPath, "utf-8");

    const dbData: Database = JSON.parse(dbContent);
    const users: User[] = dbData.data || [];

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use." }, { status: 400 });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      phone,
      role: "user",
    };

    users.push(newUser);
    dbData.data = users;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), "utf-8");

    const token = jwt.sign(
      { id: newUser.id, name, email, phone, role: newUser.role }, 
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Fixed the issue
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ token, user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
