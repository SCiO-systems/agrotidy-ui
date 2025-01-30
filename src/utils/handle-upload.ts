import React from 'react';
import { SuccessResponse, UppyFile } from '@scioservices/upload-component';

type UploadFileParams = {
	file: UppyFile & {
		s3Multipart: {
			key: string;
			uploadId: string;
		};
	};
	response: SuccessResponse;
	userId: number;
	parent: number | undefined;
};

export const handleUpload = (
	params: UploadFileParams,
	setState: React.Dispatch<string>
) => {
	let s3Location: string;
	if (params.file.s3Multipart?.key) {
		s3Location = params.file.s3Multipart.key;
	} else {
		if (params.response?.uploadURL) {
			const locationUrl: Array<string> =
				params.response.uploadURL.split('.com/');
			locationUrl.splice(1, 1, ...locationUrl[1].split('?'));
			s3Location = locationUrl[1];
		} else {
			s3Location = '';
		}
	}
	setState(s3Location);
};
