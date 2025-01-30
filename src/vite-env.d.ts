/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_API_URL: string;
	readonly VITE_APP_AUTH0_DOMAIN: string;
	readonly VITE_APP_AUTH0_CLIENT_ID: string;
	readonly VITE_APP_AUTH0_API_ID: string;
	readonly VITE_APP_AUTH0_SCOPE: string;
	readonly VITE_APP_REDIRECT_URL: string;
	readonly VITE_APP_ENV: 'dev' | 'stg' | 'prod';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
