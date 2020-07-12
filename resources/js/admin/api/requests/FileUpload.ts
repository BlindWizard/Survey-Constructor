export class FileUpload {
	public file: File;
	public onUpload: ((progressEvent: any) => void) | undefined;
}