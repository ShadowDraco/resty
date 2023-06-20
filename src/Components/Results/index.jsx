import React from 'react';

import './Results.scss';

export default function Results(props) {
	return (
		<section className='results'>
			<pre>
				{props.data ? (
					<p data-testid='results'>
						{JSON.stringify(props.data, undefined, 2)}
					</p>
				) : null}
			</pre>
		</section>
	);
}
