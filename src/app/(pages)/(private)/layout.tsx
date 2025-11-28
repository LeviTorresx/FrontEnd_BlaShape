"use client";
import "../../globals.css";
import EmotionRegistry from "@/app/components/EmotionRegistry";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Providers from "../Providers";
import GlobalDataLoader from "./GlobalDataLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <ThemeProvider theme={{}}>
            <CssBaseline />
            <Providers>
              <GlobalDataLoader />
              {children}
            </Providers>
          </ThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
