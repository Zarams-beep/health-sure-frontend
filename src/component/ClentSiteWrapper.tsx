"use client";
import { useState, useEffect, ReactNode, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation"; // Correct import
import MediaHeaderSection from "@/component/MediaHeader";
import HeaderSection from "@/component/Header";
import MainLayout from "@/component/MainLayout";
import useInvalidPaths from "./hooks/invalid-path";
import React from "react";

// Separate component to handle search params
function QueryParamHandler({ setFullNames }: { setFullNames: (name: string | undefined) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    setFullNames(searchParams.get("fullName") ?? undefined);
  }, [searchParams, setFullNames]);

  return null; // No UI, only handles state update
}

type ClientSideWrapperProps = {
  children: ReactNode;
};

export default function ClientSideWrapper({ children }: ClientSideWrapperProps) {
  const pathname = usePathname();
  const isInvalidPath = useInvalidPaths();

  const [full_name, setFullNames] = useState<string | undefined>(undefined);
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
  const useMainLayout = full_name !== undefined || isDashboard;

  if (!hasMounted) return <p>Loading...</p>; // Avoid hydration issues

  return (
    <main className={` ${isInvalidPath ? "mt-0" : ""} main-wrapping-container`}>
      {/* Handle search params inside Suspense */}
      <Suspense fallback={null}>
        <QueryParamHandler setFullNames={setFullNames} />
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
