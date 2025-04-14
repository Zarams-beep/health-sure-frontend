import FooterSection from "@/component/Footer";
import MainWrapper from "@/component/MainWrapper";
// Styles
import "./globals.css";

export const metadata = {
  title: "Health Sure",
  description: "Health Sure Assurance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Call useMediaQuery directly at the top level

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mobile.png" type="image/png" />
      </head>
      <body>
        <MainWrapper>{children}</MainWrapper>
        <FooterSection />
      </body>
    </html>
  );
}
