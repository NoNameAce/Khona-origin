// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { LoginCredentials } from '@/entities/auth/types';
import { login } from '@/entities/auth/api';

export async function POST(request: Request) {
  try {
    const credentials: LoginCredentials = await request.json();
    

    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { token, user } = await login(credentials);
    console.log(NextResponse.json({ user, token }));
    
    
    // Return token to be stored in localStorage
    return NextResponse.json({ user, token });
    
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 401 }
    );
  }
}