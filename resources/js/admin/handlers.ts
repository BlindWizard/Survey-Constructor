export const errorHandler: OnErrorEventHandler = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
	document.body.innerHTML = `
		<div class="callout alert">
			<p>Sorry, we detect fatal error on this page :(</p>
			<p>The service will be available soon.</p>
		</div>
	`;
};