import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    const me = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          navigator("/dashboard");
        }
      } catch (err) {}
    };

    me();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Logging in...");
      const response = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.dismiss();
        toast.error(data.message);
      } else {
        toast.dismiss();

        toast.success("Logged in successfully");

        navigator("/dashboard");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-5">
      <div className="w-full max-w-md">
        <div className="bg-stone-800 border border-stone-700 rounded-3xl p-8">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-stone-400">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 mt-1 bg-stone-900 border border-stone-600 rounded-xl text-white"
                placeholder="admin@email.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-stone-400">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 bg-stone-900 border border-stone-600 rounded-xl text-white"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-3 mt-4 bg-white text-stone-900 font-semibold rounded-xl">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
