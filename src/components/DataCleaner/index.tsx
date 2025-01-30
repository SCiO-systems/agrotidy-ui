/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-redundant-type-constituents */
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import './styles.css';
import { UploadComponent, Uppy } from '@scioservices/upload-component';
import { useAuth0 } from '@auth0/auth0-react';
import ToolsService, { TransformBody } from '../../lib/tools';
import { TokenContext, TokenContextType } from '../../providers/token.tsx';
import { handleUpload } from '../../utils/handle-upload.ts';

export const DataCleaner = () => {
	// region NEW CODE
	const { user } = useAuth0();
	const { token } = useContext<TokenContextType>(TokenContext);
	const [questionnaire, setQuestionnaire] = useState<string>('');
	const [codebook, setCodebook] = useState<string>('');
	const [survey, setSurvey] = useState<string>('');

	const [checked, setChecked] = useState(false);
	const [stataCompatible, setStataCompatible] = useState(false);
	const [uppy1, setUppy1] = useState<Uppy | undefined>();
	const [uppy2, setUppy2] = useState<Uppy | undefined>();
	const [uppy3, setUppy3] = useState<Uppy | undefined>();

	// endregion

	const transform = (body: TransformBody, type: string) => {
		ToolsService.cleanSurveyData(user?.sub || '', body, type)
			.then((res) => {
				const link = document.createElement('a');
				link.href = res as string;
				link.setAttribute('download', '');
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const renderFooterButtons = () => {
		if (checked) {
			return (
				<>
					<p style={{ marginTop: '25px' }}>
						<u>
							<strong>IMPORTANT NOTICE</strong>
						</u>
						: Keep in mind that the transformation service may take
						some time!
					</p>
					<Button
						className="transform"
						label="Transform Data using Codebook"
						icon="pi pi-cog"
						style={{ marginTop: '15px', marginBottom: '20px' }}
						onClick={() =>
							transform(
								{
									s3DataKey: survey,
									s3FormKey: questionnaire,
									s3CodebookKey: codebook,
								},
								'full'
							)
						}
						disabled={!survey && !questionnaire && !codebook}
					/>
				</>
			);
		}
		return (
			<Button
				icon="fa-solid fa-arrow-progress"
				label="Transform file"
				disabled={!survey}
				onClick={() =>
					transform(
						{
							s3DataKey: survey,
						},
						'simple'
					)
				}
			/>
		);
	};

	return (
		<div className="data-cleaner">
			<div className="search-bar-layout-content odk-page">
				<Fieldset className="fieldset-odk" legend="Survey Data Cleaner">
					<p>
						This tool removes DataScribe code and group paths from
						column headers and creates metadatabs tab to save this
						information.
					</p>
					<p style={{ fontSize: '20px' }}>
						To use this tool your dataset must:
					</p>
					<p>
						<ul>
							<li>Be in Excel format.</li>
							<li>
								“Include labels” (in the Advanced export
								options).
							</li>
							<li>
								Have group names (Untick “Remove prefixed group
								names” in the Advanced export options).
							</li>
						</ul>
					</p>
					<p
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '4px',
						}}
					>
						<label htmlFor="binary">Use Codebook </label>
						<Checkbox
							onChange={(e) => setChecked(e.checked as boolean)}
							checked={checked}
						/>
					</p>
					{checked ? (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '12px',
							}}
						>
							<p>
								If you want to use a specific numeric encoding
								(codebook) for the answer values of the
								multichoice questions, please provide:
							</p>
							<p>- the dataset in the format mentioned above,</p>
							<p>- the ODK questionnaire,</p>
							<p>
								- a codebook file that defines the mappings
								between choice names and the code values you
								want to use.
							</p>
							<p>
								The tool accepts codebooks as 3-column CSV files
								with a specific structure:
							</p>
							<p>
								<ul>
									<li>
										the first column contains the list name
										of the list that defines the choice;
									</li>
									<li>
										the second column contains the name of
										the choice;
									</li>
									<li>
										the third column contains the numeric
										code corresponding to the choice.
									</li>
								</ul>
							</p>
							<p>
								Keep in mind that the first row of the codebook
								CSV file is considered as the header and is not
								used by the system. In this case, the system
								also produces an .sps file that can be loaded
								into SPSS to use the defined label/code mapping
								within SPSS.
							</p>
							<p
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '4px',
								}}
							>
								<label htmlFor="binary">
									Use STATA-conformant variable names{' '}
								</label>
								<Checkbox
									onChange={(e) =>
										setStataCompatible(e.checked as boolean)
									}
									checked={stataCompatible}
								/>
							</p>
							<p>
								The tool allows to get STATA conformant variable
								names (i.e. variable&apos;s name under 32
								characters). When ticking this option, variable
								names follow a consistent varNNNNNN pattern,
								with mappings to the original names presented in
								a metadata sheet.
							</p>
							<div className="upload-container">
								<h4>
									Please upload your dataset in Excel format
								</h4>
								<UploadComponent
									uppy={uppy1}
									setUppy={setUppy1}
									devUrl={import.meta.env.VITE_APP_API_URL}
									accessToken={token}
									userId={0}
									uppyType={'dashboard'}
									note={''}
									onUploadCompleted={(params) =>
										handleUpload(params, setQuestionnaire)
									}
									restrictions={{
										maxNumberOfFiles: 1,
										allowedFileTypes: ['.xlsx'],
									}}
								/>
							</div>
							<Divider layout="vertical" />
							<div className="upload-container">
								<h4>Please upload your codebook</h4>
								<UploadComponent
									uppy={uppy2}
									setUppy={setUppy2}
									devUrl={import.meta.env.VITE_APP_API_URL}
									accessToken={token}
									userId={0}
									uppyType={'dashboard'}
									note={''}
									onUploadCompleted={(params) =>
										handleUpload(params, setCodebook)
									}
									restrictions={{
										maxNumberOfFiles: 1,
										allowedFileTypes: ['.csv'],
									}}
								/>
							</div>
						</div>
					) : null}
					<div className="flex">
						<div className="uploader-container">
							<div className="upload-survey">
								<h4>Please upload your survey data</h4>
								<UploadComponent
									uppy={uppy3}
									setUppy={setUppy3}
									devUrl={import.meta.env.VITE_APP_API_URL}
									accessToken={token}
									userId={0}
									uppyType={'dashboard'}
									note={''}
									onUploadCompleted={(params) =>
										handleUpload(params, setSurvey)
									}
									restrictions={{
										maxNumberOfFiles: 1,
										allowedFileTypes: ['.xlsx'],
									}}
								/>
							</div>
						</div>
					</div>
					{renderFooterButtons()}
				</Fieldset>
			</div>
		</div>
	);
};
