"use client";
import { Assistant } from "../assistant";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AssistantPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      if (!data.authenticated) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  return <Assistant />;
} 