"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";

const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      // If no token, redirect to login
      router.replace("/auth/log-in");
    }
  }, [token, router]);

  // If token exists, render the dashboard
  return <>{token && children}</>;
};

export default DashboardGuard;
