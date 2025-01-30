import React from 'react';
import { useRoutes, Outlet, RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader } from '../components/Loader';
import { MainLayout } from '../components/Layout/MainLayout.tsx';
import { DataCleaner } from '../components/DataCleaner';
import { CropModel } from '../components/CropModel';
import { Home } from '../components/Home';

const App = () => {
	const { isLoading, isAuthenticated } = useAuth0();

	return (
		<React.Suspense
			fallback={
				<div className="flex h-full w-full items-center justify-center">
					<Loader />
				</div>
			}
		>
			{isLoading || !isAuthenticated ? (
				<Loader />
			) : (
				<MainLayout>
					<Outlet />
				</MainLayout>
			)}
		</React.Suspense>
	);
};

export const AppRoutes = () => {
	const routes: RouteObject[] = [
		{
			path: '/',
			// @ts-expect-error test
			element: <PrivateRoute component={App} />,
			children: [
				{
					index: true, // Indicates this is the default for the base route
					element: <Home />,
				},
				{
					path: '/survey-cleaner',
					element: <DataCleaner />,
				},
				{
					path: '/crop-transformer',
					element: <CropModel />,
				},
			],
		},
	];

	return useRoutes(routes);
};
