"use client";
import { store } from "@/app/store/store";
import "../../globals.css";
import EmotionRegistry from "@/app/components/EmotionRegistry";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

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
            <Provider store={store}>{children}</Provider>
          </ThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
