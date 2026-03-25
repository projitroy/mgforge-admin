'use client';

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, Suspense, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("redirect") || "/home";

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    if (!res.ok) {
      setError("Login failed");
      return;
    }

    router.replace(next);
  }

  if (!mounted) {
    return (
      <div className="h-screen w-screen grid grid-cols-2 items-center justify-center">
        <div className="col-span-1 flex items-center justify-center" />
        <div className="col-span-1 h-full flex items-center justify-center bg-gray-400/50" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen grid grid-cols-2 items-center justify-center">
      <div className="col-span-1 flex items-center justify-center">
        <img src="/logo.jpg" alt="Logo" />
      </div>
      <div className="col-span-1 h-full flex items-center justify-center bg-gray-400/50">
        <form onSubmit={onSubmit} className="w-2/5 gap-4 flex flex-col items-center justify-center">
          <span className="text-gray-800 text-xl font-bold">Sign in</span>
          <span className="text-gray-600 text-lg">Enter your credentials below</span>
          <Input
            placeholder="Enter your username"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="bg-white w-full h-10"
          />
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white h-10"
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full h-12 bg-gray-800">Sign in</Button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}