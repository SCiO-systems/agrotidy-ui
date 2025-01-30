import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { WithAuthenticationRequiredOptions } from '@auth0/auth0-react/src/with-authentication-required.tsx';

type PrivateRouteProps = {
	component: never;
	args?: WithAuthenticationRequiredOptions;
};

export const PrivateRoute = ({ component, args }: PrivateRouteProps) => {
	const Component = withAuthenticationRequired(component, args);
	return <Component />;
};
