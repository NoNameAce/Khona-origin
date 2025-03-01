import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  propertyAmpont: number;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface Database {
  data: User[];
}

export async function POST(request: Request) {
  try {
    const body: LoginRequestBody = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const dbPath = path.join(process.cwd(), "db.json");
    const dbContent = fs.readFileSync(dbPath, "utf-8");

    // Explicitly typing the parsed dbContent as Database
    const dbData: Database = JSON.parse(dbContent);
    const users: User[] = dbData.data || [];

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, propertyAmpont: user.propertyAmpont },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Explicitly marking the unused password as unused (to avoid TypeScript warning)
    const { password: _unused, ...userWithoutPassword } = user;

    return NextResponse.json({ token, user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
