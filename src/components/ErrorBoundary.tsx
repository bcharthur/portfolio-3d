import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render errors in a subtree (e.g. a 3D scene failing because an
 * external asset couldn't be fetched) and swaps in a fallback instead of
 * letting the error bubble up and unmount the entire app.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Scene failed to render, falling back:", error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
