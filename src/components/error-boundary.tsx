import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Shown above the fallback; lets the two app surfaces identify themselves. */
  surface: string;
};

type State = { error: Error | null };

/**
 * Last-resort crash containment. Without this, one bad content shape
 * (e.g. an imported JSON blob missing `projects`) whitescreens the
 * entire SPA — for a portfolio, invisibility is the worst failure mode.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    // No logging backend — keep it observable in devtools at least.
    console.error(`[ErrorBoundary:${this.props.surface}]`, error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-dark-bg px-4">
          <div className="glass-card max-w-md p-6 text-center sm:p-8">
            <p className="font-heading text-xl font-bold text-dark-text">Something broke.</p>
            <p className="mt-2 text-sm text-dark-muted">
              {this.props.surface === "admin"
                ? "The admin panel hit bad data. Settings → Reset to defaults usually fixes it."
                : "This page hit bad data. Try reloading — if it persists, the content store needs a reset."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
              <a href="#/" className="btn-secondary">
                Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
