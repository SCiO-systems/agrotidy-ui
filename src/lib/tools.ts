/* eslint-disable */

import { axios } from './axios.js';

export type TransformBody = {
	s3DataKey: string;
	s3FormKey?: string;
	s3CodebookKey?: string;
};

class ToolsService {
	transformCrop = async (userId: string, model: string, s3Key: string) => {
		const data = { model, s3Key };
		const result = await axios.post(`tools/crop`, data);
		return result.data;
	};

	cleanSurveyData = async (
		userId: string,
		body: TransformBody,
		type: string
	) => {
		const result = await axios.post(`tools/datacleaner/${type}`, body);
		return result.data;
	};
}

export default new ToolsService();
