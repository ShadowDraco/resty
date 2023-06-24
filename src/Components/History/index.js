import React from 'react';

import './History.scss';
import Entry from './Entry';

export default function History({ history, updateData }) {
	return (
		<section className='history'>
			<p>Request History: </p>
			{history
				? history.history.map(request => {
						return (
							<Entry
								key={request.id}
								request={request}
                updateData={updateData}
							/>
						);
				  })
				: 'No History Yet.'}
		</section>
	);
}
