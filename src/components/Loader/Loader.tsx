import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

export const Loader = () => {
	return (
		<div className="flex h-full w-full items-center justify-center pt-[20%]">
			<ProgressSpinner />
		</div>
	);
};
