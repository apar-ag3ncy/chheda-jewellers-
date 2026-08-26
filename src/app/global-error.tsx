"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary: catches faults in the root layout itself, where no
 * providers, fonts or tokens are guaranteed to have loaded. It therefore
 * renders its own <html>/<body> and inlines the few brand values it needs
 * rather than reaching for a stylesheet that may be the thing that failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the server stack in production.
    console.error("Root layout error", error.digest ?? "", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b3a2d",
          color: "#e8ddc7",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "30rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.7 }}>
            Chheda Jewellers
          </p>
          <h1 style={{ margin: "1.5rem 0 0", fontWeight: 300, fontSize: "clamp(1.6rem,4vw,2.4rem)" }}>
            Something went wrong
          </h1>
          <p style={{ margin: "1rem 0 2rem", opacity: 0.8, lineHeight: 1.7, fontWeight: 300 }}>
            A fault on our side. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 44,
              padding: "0.75rem 1.5rem",
              borderRadius: 999,
              border: "1px solid rgba(232,221,199,0.4)",
              background: "transparent",
              color: "#e8ddc7",
              font: "inherit",
              fontSize: "0.7rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
