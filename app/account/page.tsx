"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Account() {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/account")
      .then(res => res.json())
      .then(data => {
        if (data.email) setEmail(data.email);
        else router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (email === null) return <div style={{ maxWidth: 300, margin: "2rem auto" }}>Not logged in.</div>;

  return (
    <div style={{ maxWidth: 300, margin: "2rem auto" }}>
      <h2>Account</h2>
      <div>Email: {email}</div>
      <button onClick={handleLogout} style={{ marginTop: 16, padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
} 