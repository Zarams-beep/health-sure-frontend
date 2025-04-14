"use client";
import { useState, useEffect, ReactNode, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation"; // Correct import
import MediaHeaderSection from "@/component/MediaHeader";
import HeaderSection from "@/component/Header";
import MainLayout from "@/component/MainLayout";
import useInvalidPaths from "./hooks/invalid-path";
import React from "react";

// Separate component to handle search params
function QueryParamHandler({ setUserId }: { setUserId: (id: string | undefined) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    setUserId(searchParams.get("userId") ?? undefined);
  }, [searchParams, setUserId]);

  return null; // No UI, only handles state update
}

type ClientSideWrapperProps = {
  children: ReactNode;
};

export default function ClientSideWrapper({ children }: ClientSideWrapperProps) {
  const pathname = usePathname();
  const isInvalidPath = useInvalidPaths();

  const [id, setUserId] = useState<string | undefined>(undefined);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Ensure no SSR mismatch
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const checkScreenSize = () => setIsMobile(window.innerWidth < 920);
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, [hasMounted]);

  const isDashboard = hasMounted ? pathname.startsWith("/dashboard") : false;
  const useMainLayout = id !== undefined || isDashboard;

  if (!hasMounted) return <p>Loading...</p>; // Avoid hydration issues

  return (
    <main className={` ${isInvalidPath ? "mt-0" : ""} main-wrapping-container`}>
      {/* Handle search params inside Suspense */}
      <Suspense fallback={null}>
        <QueryParamHandler setUserId={setUserId} />
      </Suspense>

      {useMainLayout ? (
        <MainLayout>
          <Suspense fallback={<p>Loading page...</p>}>{children}</Suspense>
        </MainLayout>
      ) : (
        <>
          {!isInvalidPath && (isMobile ? <MediaHeaderSection /> : <HeaderSection />)}
          {children}
        </>
      )}
    </main>
  );
}
