import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Maderas Blashape",
  description:
    "Optimiza tus cortes, reduce desperdicios y aumenta tus ganancias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 font-sans">
        <main>{children}</main>
      </body>
    </html>
  );
}
