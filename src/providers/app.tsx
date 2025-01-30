import { Button } from 'primereact/button';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader } from '../components/Loader';
import { AuthProvider } from './auth.tsx';
import { TokenProvider } from './token.tsx';

type ErrorFallbackProps = {
	error: Error;
};

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
	return (
		<div
			className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
			role="alert"
		>
			<h2 className="text-lg font-semibold">
				Ooops, something went wrong :({' '}
			</h2>
			<h3>{error.message}</h3>
			<Button
				className="mt-4"
				onClick={() => window.location.assign(window.location.origin)}
			>
				Refresh
			</Button>
		</div>
	);
};

const queryClient = new QueryClient();

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<React.Suspense fallback={<Loader />}>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<AuthProvider>
					<TokenProvider>
						<QueryClientProvider client={queryClient}>
							<HelmetProvider>{children}</HelmetProvider>
						</QueryClientProvider>
					</TokenProvider>
				</AuthProvider>
			</ErrorBoundary>
		</React.Suspense>
	);
};
