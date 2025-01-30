import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import datapoolAlpha from '../../../assets/images/Menu/datapool_alpha_2.png';
import './styles.css';
import { axios } from '../../../lib/axios.js';

type HeaderBarProps = {
	token: string;
};

const HeaderBar = ({ token }: HeaderBarProps) => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const navigate = useNavigate();

	const handleLogout = () => {
		axios.defaults.headers.common.Authorization = `Bearer`;
		void logout({
			logoutParams: { returnTo: import.meta.env.VITE_APP_URL as string },
		});
	};

	const menuItemsPublic = [
		{
			label: 'About',
			command: () => navigate('/About'),
		},
		{
			label: 'Login',
			className: 'login-item',
			command: () => loginWithRedirect(),
		},
	];

	const menuItemsValidated = [
		{
			label: 'Survey Data Cleaner',
			command: () => navigate('/survey-cleaner', { state: { token } }),
		},
		{
			label: 'Crop Model Data Transformer',
			command: () => navigate('/crop-transformer', { state: { token } }),
		},
		{
			label: 'About',
			className: 'login-item',
			command: () => navigate('/About'),
		},
		// {
		// 	label: 'My Datapools',
		// 	className: 'login-item',
		// 	command: () => {
		// 		setActiveIndex(2);
		// 		navigate('/Home');
		// 	},
		// },
		{
			icon: 'pi pi-user',
			className: 'logout-menu',
			items: [
				{
					label: 'Profile',
					icon: 'fa-solid fa-user',
				},
				{
					label: 'Logout',
					icon: 'fa-solid fa-right-from-bracket',
					command: handleLogout,
				},
			],
		},
	];

	const menuItems = useMemo(() => {
		if (isAuthenticated) {
			return menuItemsValidated;
		}
		return menuItemsPublic;
	}, []);

	const startTemplate = () => {
		return (
			<Button rounded text onClick={() => navigate('/')}>
				<img
					src={datapoolAlpha}
					alt="logo"
					style={{ height: '70px' }}
				/>
			</Button>
		);
	};

	return (
		<div className="menu-bar">
			<Menubar
				model={menuItems}
				start={startTemplate}
				style={{ width: '100%' }}
			/>
		</div>
	);
};

export default HeaderBar;
