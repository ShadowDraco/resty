import React, { useState } from 'react';

import './Form.scss';

export default function Form(props) {
	const handleSubmit = e => {
		e.preventDefault();
		props.handleApiCall({ url, currentMethod, body }, useMockData);
	};

	const [currentMethod, setCurrentMethod] = useState('GET');
	const [body, setBody] = useState({});
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/ditto');
	const [useMockData, setUseMockData] = useState(true);

	const updateUrl = e => {
		setUrl({ url: e.target.value });
	};
	const updateMethod = e => {
		setCurrentMethod({ method: e.target.innerText });
	};

	const updateBody = e => {
		setBody({ body: e.target.value });
	};

	const changeMockData = () => {
		setUseMockData(!useMockData);
	};

	const updateCurrentMethod = method => {
		setCurrentMethod(method);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					<span>URL: </span>
					<input
						name='url'
						type='text'
						onChange={updateUrl}
					/>
					<span>Body: </span>
					<input
						name='body'
						type='text'
						onChange={updateBody}
					/>
					<button type='submit'>GO!</button>
				</label>
				<label className='methods'>
					<span
						id='get'
						className={currentMethod === 'GET' && 'current'}
						onClick={e => {
							updateMethod(e);
							updateCurrentMethod('GET');
						}}
					>
						GET
					</span>
					<span
						id='post'
						className={currentMethod === 'POST' && 'current'}
						onClick={e => {
							updateMethod(e);
							updateCurrentMethod('POST');
						}}
					>
						POST
					</span>
					<span
						id='put'
						className={currentMethod === 'PUT' && 'current'}
						onClick={e => {
							updateMethod(e);
							updateCurrentMethod('PUT');
						}}
					>
						PUT
					</span>
					<span
						id='delete'
						className={currentMethod === 'DELETE' && 'current'}
						onClick={e => {
							updateMethod(e);
							updateCurrentMethod('DELETE');
						}}
					>
						DELETE
					</span>
					<span
						id='option'
						className={useMockData && 'current'}
						onClick={changeMockData}
					>
						Mock Data?
					</span>
				</label>
				<div>Use mock data: {useMockData ? 'true' : 'false'}</div>
			</form>
		</>
	);
}
