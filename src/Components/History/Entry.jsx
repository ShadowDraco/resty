import React from 'react';

export default function Entry({ request, updateData }) {
	return (
		<div
			className='entry'
			onClick={() => {
				updateData(request)
			}}
		>
			<div data-testid='app-method'>
				Request Method: {request.requestParams.method}
			</div>
			<div>
				<small>URL: {request.requestParams.url}</small>
			</div>
		</div>
	);
}
