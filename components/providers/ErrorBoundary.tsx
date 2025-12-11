"use client";

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="fixed inset-0 flex items-center justify-center bg-odin-dark text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Ошибка инициализации</h1>
              <p className="text-sm text-gray-400">
                {this.state.error?.message}
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
