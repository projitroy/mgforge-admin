"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("redirect") || "/home";

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, password }),
    });

    if (!res.ok) {
      setError("Login failed");
      return;
    }

    // After cookie is set, navigate to the intended destination
    router.replace(next);
  }

  return <div></div>;
}

{
  /* <div style={{ maxWidth: 360, margin: "40px auto" }}>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", width: "100%", margin: "8px 0" }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", width: "100%", margin: "8px 0" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Sign in</button>
      </form>
    </div> */
}
