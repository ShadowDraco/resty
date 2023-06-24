import React, { useState, useEffect, useReducer } from 'react';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

import axios from 'axios';
import History from './Components/History';

export const requestReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.ADD:
			return { ...state, history: [...state.history, action.payload] };
		case ACTIONS.REMOVE:
			// remove by index
			return { ...state => state.history.splice(action.payload, 1) };
		case ACTIONS.START_LOADING:
			return { ...state, loading: true };
		case ACTIONS.STOP_LOADING:
			return { ...state, loading: false };
		case ACTIONS.SET_DATA:
			return { ...state, data: action.payload };
		case ACTIONS.SET_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export const ACTIONS = {
	ADD: 'ADD',
	REMOVE: 'REMOVE',
	START_LOADING: 'START-LOADING',
	STOP_LOADING: 'STOP-LOADING',
	SET_DATA: 'SET-DATA',
	SET_ERROR: 'SET-ERROR',
};

export default function App({ url }) {
	const [requestParams, setRequestParams] = useState({});
	const [history, dispatch] = useReducer(requestReducer, {
		history: [],
		loading: false,
		data: null,
		error: null,
	});

	const addRequest = (requestParams, requestData) => {
		let action = {
			type: ACTIONS.ADD,
			payload: {
				id: requestParams.id ? requestParams.id : history.history.length,
				requestParams: requestParams,
				data: requestData,
			},
		};
		dispatch(action);
	};

	const updateData = data => {
		dispatch({ type: ACTIONS.SET_DATA, payload: data });
	};

	const updateError = error => {
		dispatch({ type: ACTIONS.SET_ERROR, payload: error });
	};

	const startLoading = () => {
		dispatch({ type: ACTIONS.START_LOADING });
	};

	const stopLoading = () => {
		dispatch({ type: ACTIONS.STOP_LOADING });
	};

	useEffect(() => {
		startLoading();

		const doApiCall = async () => {
			try {
				if (requestParams.method) {
					if (url) requestParams.url = url;
					let data = await axios(requestParams);

					updateData(data);
					updateError(null);
					addRequest(requestParams, data);
					stopLoading();
				}
			} catch (error) {
				console.log(error);
				updateError({ message: error.message, code: error.code });
			}
		};
		// call the function
		doApiCall();
		stopLoading();
		//* I shouldn't need to add addRequest or ulr to dependency array??? */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestParams, url]);

	const callApi = requestParams => {
		setRequestParams(requestParams);
	};

	return (
		<React.Fragment>
			<Header />
			<div className='form-history'>
				<History
					history={history}
					updateData={updateData}
				/>
				<Form handleApiCall={callApi} />
				{history.error && (
					<p id='error'>
						{history.error.code && history.error.code}: {history.error.message}
					</p>
				)}
			</div>
			<Results
				data={history.data}
				loading={history.loading}
				setError={dispatch}
				addRequest={addRequest}
				url={url}
			/>
			<Footer />
		</React.Fragment>
	);
}
