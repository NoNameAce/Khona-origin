"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { RegistrationSchema, registrationSchema } from "@/entities/auth/models/registration-schema";
import { registerUser } from "@/entities/auth/api";

export default function Registration() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegistrationSchema) => {
    setLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    const userData = {
      name: data.userName,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword,
      phone: data.phone as string,
    };

    try {
      const response = await registerUser(userData);

      if (!response || !response.token) {
        throw new Error("Invalid response from server.");
      }

      localStorage.setItem("access_token", response.token);

      setSuccessMessage("Registration successful! Redirecting...");
      console.log('success');
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Registration error:", error);
      setFormError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register("userName")}
            className="w-full p-2 border rounded"
          />
          {errors.userName && (
            <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full p-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {formError && <p className="text-red-500 text-sm text-center mt-2">{formError}</p>}
      {successMessage && <p className="text-green-500 text-sm text-center mt-2">{successMessage}</p>}

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
