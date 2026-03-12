"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  const [hydrated, setHydrated] = useState(false);

  // Wait one tick for redux-persist to rehydrate from localStorage
  // before making any redirect decisions — fixes production race condition
  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/auth/log-in");
    }
  }, [hydrated, token, router]);

  // Don't render anything until we know the auth state
  if (!hydrated) return null;

  return <>{token && children}</>;
};

export default DashboardGuard;
