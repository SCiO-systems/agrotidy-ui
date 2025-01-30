import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useEffect, useState } from 'react';
import { axios } from '../lib/axios.ts';

export type TokenContextType = {
	token: string;
	// setToken: React.Dispatch<string>;
};

export const TokenContext = createContext<TokenContextType>({
	token: '',
});

type AuthProviderProps = {
	children: React.ReactNode;
};

export const TokenProvider = ({ children }: AuthProviderProps) => {
	const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
	const [token, setToken] = useState<string>('');

	useEffect(() => {
		async function updateTokenState() {
			const token = await getAccessTokenSilently();
			setToken(token);
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		}

		if (isAuthenticated) {
			void updateTokenState();
		}
	}, [user, isAuthenticated]);

	return (
		<TokenContext.Provider value={{ token }}>
			{children}
		</TokenContext.Provider>
	);
};
