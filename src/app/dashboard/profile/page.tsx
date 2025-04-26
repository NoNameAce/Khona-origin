"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeUserToken, logoutUser } from "@/entities/auth/token";

import * as z from "zod";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Номуи корбар бояд на камтар аз 2 харф бошад." })
    .max(30, { message: "Номуи корбар наметавонад аз 30 харф бештар бошад." }),
  email: z
    .string({ required_error: "Лутфан як почтаи электрониро интихоб кунед." })
    .email("Почтаи электронӣ нодуруст аст"),
  bio: z.string().max(160).min(4, "Биография бояд на камтар аз 4 харф бошад."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const decoded = decodeUserToken();
    if (!decoded) {
      router.push("/auth/login");
      return;
    }
    setUserName(decoded.name || "");
    setUserEmail(decoded.email || "");
  }, [router]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      username: userName,
      email: userEmail,
      bio: "Ман як мухлиси амволи ғайриманқул ҳастам.",
    },
  });

  useEffect(() => {
    form.reset({
      username: userName,
      email: userEmail,
      bio: "Ман як мухлиси амволи ғайриманқул ҳастам.",
    });
  }, [userName, userEmail, form]);

  function onSubmit(data: ProfileFormValues) {
    console.log("Формаи профил фиристода шуд:", data);
  }

  function handleLogout() {
    logoutUser();
    router.push("/auth/login");
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Профил</h2>
        <p className="text-gray-600 mb-6">Ин тарзи нишон додани шумо дар сайт аст.</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Номуи корбар
            </label>
            <input
              {...form.register("username")}
              id="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Номуи корбари худро ворид кунед"
            />
            {form.formState.errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Почта
            </label>
            <input
              {...form.register("email")}
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Почтаи худро ворид кунед"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Биография
            </label>
            <textarea
              {...form.register("bio")}
              id="bio"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              placeholder="Маъзаратонро каме дар бораи худ ба мо бигӯед"
            />
            {form.formState.errors.bio && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.bio.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Бафарини профилро навсозӣ кунед
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
        >
          Баромад
        </button>
      </div>
    </div>
  );
}
