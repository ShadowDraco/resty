import React from 'react';

export default function Entry({ request, updateData, remove }) {
	return (
		<div
			className='entry'
			data-testid='history-entry'
			onClick={() => {
				updateData(request);
			}}
		>
			<div data-testid='app-method'>
				Request Method: {request.requestParams.method}
			</div>
			<div>
				<small>URL: {request.requestParams.url}</small>
			</div>
			<button
				onClick={() => {
					remove(request.id);
				}}
			>
				X
			</button>
		</div>
	);
}
