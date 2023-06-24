import React, { useState, useEffect } from 'react';
import JSONPretty from 'react-json-pretty';
import axios from 'axios';

import './Results.scss';
import { ACTIONS } from '../../App';

export default function Results({ setError, loading, url, addRequest, data }) {
	var JSONPrettyMon = require('react-json-pretty/dist/monikai');
	const [joke, setJoke] = useState(null);

	useEffect(() => {
		// set the data with a dad joke when the page first starts before a real API call is given
		const fetchJoke = async () => {
			const newUrl = url || 'https://icanhazdadjoke.com/';

			let joke = await axios.get(newUrl, {
				headers: {
					Accept: 'application/json',
				},
			});

			setJoke(joke.data.joke);
			addRequest({
				id: Math.random(),
				url: newUrl,
				headers: {
					Accept: 'application/json',
				},
				method: 'GET',
				data: joke.data,
			});
		};

		try {
			fetchJoke();
		} catch (error) {
			console.log(error);
			setError({
				type: ACTIONS.SET_ERROR,
				payload: { message: error.message, code: error.code },
			});
		}
		//* Should not need to monitor addRequest function OR setError function*/
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return (
		<section
			className='results'
			data-testid='results-section'
		>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					{data ? (
						<JSONPretty
							id='json-pretty'
							data-testid='API-RESULT'
							theme={JSONPrettyMon}
							data={data}
						></JSONPretty>
					) : joke ? (
						<>
							Dad Joke:
							<JSONPretty
								id='json-pretty'
								data-testid='DAD-JOKE'
								theme={JSONPrettyMon}
								data={joke}
							></JSONPretty>
						</>
					) : (
						'Loading dad joke...'
					)}
				</>
			)}
		</section>
	);
}
