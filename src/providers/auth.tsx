import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate();
	const onRedirectCallback = () => {
		navigate('/');
	};

	return (
		<Auth0Provider
			onRedirectCallback={onRedirectCallback}
			domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: import.meta.env.VITE_APP_REDIRECT_URL,
				audience: import.meta.env.VITE_APP_AUTH0_API_ID,
				scope: import.meta.env.VITE_APP_AUTH0_SCOPE,
				responseType: 'token id_token',
			}}
			useRefreshTokensFallback
			useRefreshTokens
			cacheLocation={'localstorage'}
		>
			{children}
		</Auth0Provider>
	);
};
