export const errorHandler: OnErrorEventHandler = function(event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) {
	document.body.innerHTML = `
		<div class="callout alert">
			<p>Sorry, we detect fatal error on this page :(</p>
			<p>The resource will be available soon.</p>
		</div>
	`;
};