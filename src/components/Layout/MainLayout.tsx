import React, { useContext } from 'react';
import MenuBar from './MenuBar/MenuBar.tsx';
import Footer from './Footer/Footer.tsx';
import { TokenContext, TokenContextType } from '../../providers/token.tsx';

type MainLayoutProps = {
	children?: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
	const { token } = useContext<TokenContextType>(TokenContext);
	return (
		<div
			className="main-layout"
			style={{
				minHeight: '100vh',
				display: 'grid',
				gridTemplateRows: 'auto 1fr auto',
				gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
			}}
		>
			{/*<ThemeSelector />*/}
			<MenuBar token={token} />
			<main>{children}</main>
			<Footer />
		</div>
	);
};
