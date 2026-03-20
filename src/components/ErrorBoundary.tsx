import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to sessionStorage for iPhone debug (console hidden)
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('errorBoundary', JSON.stringify({
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString()
      }));
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50 p-4">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-rose-200 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-rose-600 mb-4 montserrat-custom">
              Oops! Algo salió mal 😔
            </h2>
            <p className="text-gray-600 mb-6 montserrat-custom">
              La sección no pudo cargar. Prueba recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 w-full"
            >
              🔄 Recargar
            </button>
            <details className="mt-4 text-xs text-gray-500">
              <summary>Ver error técnico</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-left text-xs overflow-auto max-h-40">
                {this.state.error?.message}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC wrapper
export const withErrorBoundary = (Component: React.ComponentType<any>) => (props: any) => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);

export default ErrorBoundary;

