import {axios} from "../../common/axios";
import {FileUpload} from "./requests/FileUpload";
import {AxiosRequestConfig} from "axios";
import {File} from "../models/File";

export class FileApi {
	public static upload(request: FileUpload): Promise<File>
	{
		let form = new FormData();
		form.append('file', request.file, request.file.name);

		let setting: AxiosRequestConfig = {
			headers: {
				'content-type': 'multipart/form-data',
			},
			onUploadProgress: request.onUpload,
		};

		return axios.post('/admin/file/upload', form, setting).then((result) => {
			let file = new File();
			file.id = result.data.data.id;
			file.name = result.data.data.name;
			file.url = result.data.data.url;

			return file;
		});
	}
}