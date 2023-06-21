import React from 'react';

import './Results.scss';

export default function Results(props) {
	return (
		<section className='results'>
			{props.loading ? (
				<h1>Loading...</h1>
			) : (
				<pre>
					{props.data ? (
						<p data-testid='results'>
							{JSON.stringify(props.data, undefined, 2)}
						</p>
					) : (
						'Waiting for data...'
					)}
				</pre>
			)}
		</section>
	);
}
