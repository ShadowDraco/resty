import React from 'react';

import './History.scss';
import Entry from './Entry';

export default function History({ history, updateData, remove }) {
	return (
		<section className='history'>
			<p>Request History: </p>
			{history?.history ? (
				<div data-testid='HISTORY'>
					{history.history.map(request => {
						return (
							<Entry
								key={request.id}
								request={request}
								updateData={updateData}
								remove={remove}
							/>
						);
					})}{' '}
				</div>
			) : (
				'No History Yet.'
			)}
		</section>
	);
}
