/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-redundant-type-constituents */
import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import './styles.css';
import { UploadComponent, Uppy } from '@scioservices/upload-component';
import { useAuth0 } from '@auth0/auth0-react';
import ToolsService from '../../lib/tools';
import { TokenContext, TokenContextType } from '../../providers/token.tsx';
import { handleUpload } from '../../utils/handle-upload.ts';

export const CropModel = () => {
	const toast = useRef(null);
	const { token } = useContext<TokenContextType>(TokenContext);

	const { user } = useAuth0();
	const [datafile, setDatafile] = useState<string>();
	const [downloadLink, setDownloadLink] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [uppy, setUppy] = useState<Uppy | undefined>();

	const [selectedModel, setSelectedModel] = useState<{
		name: string;
		code: string;
	}>({
		name: 'DSSAT',
		code: 'dssat',
	});
	const models: Array<{ name: string; code: string }> = [
		{ name: 'DSSAT', code: 'dssat' },
		{ name: 'Apsim', code: 'apsim' },
	];

	const handleTransform = () => {
		ToolsService.transformCrop(
			user?.sub || '',
			selectedModel.code,
			datafile || ''
		)
			.then((r) => {
				setDownloadLink(r as string);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = downloadLink as string;
		link.setAttribute('download', '');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="crop-model">
			{loading ? (
				<div className="progress-spinner">
					<ProgressSpinner />
				</div>
			) : null}

			<div className="search-bar-layout-content odk-page">
				<Fieldset
					className="fieldset-odk"
					legend="Crop Model Transformer"
				>
					<p>
						The service is used to transform data following the
						AgMIP Crop Experiment (ACE) format into formats adopted
						by the widely used DSSAT and APSIM models.
					</p>
					<p>
						It accepts as input JSON files having the structure
						defined by ACE.
					</p>
					<p>
						If you have your data as a ACE JSON file, you can
						directly feed them to the service.
					</p>
					<p>
						If you have your data as an ACEB binary file, you will
						first need to unzip the file (depending on your zip
						management tools, you may have to change the extension
						of your file from .aceb to .zip) to retrieve the
						corresponding JSON file and feed it to the transformer.
					</p>
					<p>
						To build ACEB data from different types, you can use the
						relevant tool provided by AgMIP:
						<p>
							<a href="http://tools.agmip.org/acebviewer.php">
								ACEB Viewer
							</a>
						</p>
					</p>

					<p>
						<span className="select-output p-mr-4">
							Select Output Model:
						</span>

						<Dropdown
							value={selectedModel}
							onChange={(e) =>
								setSelectedModel(
									e.value as { name: string; code: string }
								)
							}
							options={models}
							optionLabel="name"
							placeholder="Select a Model"
							className="w-full md:w-14rem"
						/>
					</p>

					<Toast ref={toast} />

					<div className="uploader-container">
						<h4>Please upload your ACEB file</h4>
						<div style={{ width: '10%' }}>
							{!downloadLink ? (
								<Button
									icon="fa-solid fa-arrow-progress"
									label="Transform file"
									loading={loading}
									onClick={handleTransform}
									disabled={!datafile}
								/>
							) : (
								<Button
									icon="fa-solid fa-download"
									label="Download"
									loading={loading}
									onClick={handleDownload}
								/>
							)}
						</div>
						{token ? (
							<UploadComponent
								uppy={uppy}
								setUppy={setUppy}
								devUrl={import.meta.env.VITE_APP_API_URL}
								accessToken={token}
								userId={5}
								uppyType={'dashboard'}
								note={''}
								onUploadCompleted={(params) =>
									handleUpload(params, setDatafile)
								}
							/>
						) : null}
					</div>
				</Fieldset>
			</div>
		</div>
	);
};
