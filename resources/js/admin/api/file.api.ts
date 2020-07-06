import {axios} from "../../common/axios";
import {FileUpload} from "./requests/FileUpload";
import {AxiosRequestConfig} from "axios";

export class FileApi {
	public static upload(request: FileUpload)
	{
		let form = new FormData();
		form.append('file', request.file, request.file.name);

		let setting: AxiosRequestConfig = {
			headers: {
				'content-type': 'multipart/form-data',
			},
			onUploadProgress: request.onUpload,
		};

		return axios.post('/admin/file/upload', form, setting)
			.then((response) => {
				console.log(response);
			});
	}
}