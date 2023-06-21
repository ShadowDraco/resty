import React, { useState } from 'react';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

import axios from 'axios';

export default function App() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [requestParams, setRequestParams] = useState({});

	const callApi = async (requestParams, useMockData) => {
		setRequestParams(requestParams);
		let data;
		setLoading(true);
		if (!useMockData) {
			data = await axios(requestParams);
		} else {
			// mock output
			data = {
				count: 2,
				results: [
					{ name: 'fake thing 1', url: 'http://fakethings.com/1' },
					{ name: 'fake thing 2', url: 'http://fakethings.com/2' },
				],
			};
		}

		setData(data);
		setLoading(false);
	};

	return (
		<React.Fragment>
			<Header />
			<div>Request Method: {requestParams.method}</div>
			<div>URL: {requestParams.url}</div>

			<Form handleApiCall={callApi} />
			<Results
				data={data}
				loading={loading}
			/>
			<Footer />
		</React.Fragment>
	);
}
