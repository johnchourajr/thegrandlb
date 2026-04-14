"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, key }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-serif text-2xl italic text-black mb-1">
            The Grand LB
          </p>
          <p className="text-xs tracking-widest uppercase text-black/40">Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-black/50 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              className="w-full bg-white border border-black/15 rounded-md px-3 py-2.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-black/40 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="key" className="block text-xs text-black/50 mb-1.5">
              Secret Key
            </label>
            <input
              id="key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-white border border-black/15 rounded-md px-3 py-2.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-black/40 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-red px-3 py-2 border border-red/20 rounded-md bg-red/5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !key}
            className="w-full bg-black text-white text-sm font-medium py-2.5 rounded-md hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
