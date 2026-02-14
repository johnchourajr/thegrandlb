"use client";

import React from "react";

type SliceSimulatorErrorBoundaryProps = {
  children: React.ReactNode;
  sliceType?: string;
  sliceId?: string;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Catches render errors in the slice zone so the Prismic editor shows
 * a debug panel instead of a 500. Lets you see which slice failed and why.
 */
export class SliceSimulatorErrorBoundary extends React.Component<
  SliceSimulatorErrorBoundaryProps,
  State
> {
  constructor(props: SliceSimulatorErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[SliceSimulator]", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            padding: "1.5rem",
            margin: "1rem",
            background: "#1e1e1e",
            color: "#fafafa",
            fontFamily: "ui-monospace, monospace",
            fontSize: "13px",
            borderRadius: "8px",
            border: "1px solid #333",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
            Slice preview error
          </div>
          {this.props.sliceType && (
            <div style={{ marginBottom: "0.25rem" }}>
              <strong>Slice:</strong> {this.props.sliceType}
              {this.props.sliceId && ` (${this.props.sliceId})`}
            </div>
          )}
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Message:</strong> {this.state.error.message}
          </div>
          {this.state.error.stack && (
            <pre
              style={{
                margin: 0,
                padding: "0.75rem",
                background: "#111",
                borderRadius: "4px",
                overflow: "auto",
                maxHeight: "200px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
