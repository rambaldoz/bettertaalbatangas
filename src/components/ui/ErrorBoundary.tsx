import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  // What to show instead of the broken part. Defaults to nothing.
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Stops an error in one part of the page from blanking the whole site.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Section failed to render:', error, info.componentStack);
  }

  render() {
    return this.state.hasError
      ? (this.props.fallback ?? null)
      : this.props.children;
  }
}
