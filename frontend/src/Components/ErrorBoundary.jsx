import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-8 text-center">
                <FaExclamationTriangle className="text-6xl text-orange-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
                <p className="text-gray-400 mb-6">
                    We're sorry, but something unexpected happened. Please try again.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={resetErrorBoundary}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                        <FaHome /> Go Home
                    </button>
                </div>
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-6 text-left">
                        <summary className="text-orange-500 cursor-pointer">Error Details</summary>
                        <pre className="text-xs text-gray-400 mt-2 overflow-auto">
                            {error.message}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
};

const ErrorBoundary = ({ children }) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                console.error('Error caught by boundary:', error, errorInfo);
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;