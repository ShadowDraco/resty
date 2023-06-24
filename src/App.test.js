import { render, screen } from '@testing-library/react';
import App, { ACTIONS } from './App';
import { requestReducer } from './App';

test('main page displays', () => {
	render(<App />);
	const formElement = screen.getByText(/URL:/i);
	expect(formElement).toBeInTheDocument();
	const historyElement = screen.getByText(/Request History:/i);
	expect(historyElement).toBeInTheDocument();
});

const mockHistory = {
	history: [],
	loading: false,
	data: null,
	error: null,
};

const mockRequestParams = { url: '/joke', method: 'GET' };

const mockData = {
	id: 'R7UfaahVfFd',
	joke: 'My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.',
	status: 200,
};

test('Request Reducer sets initial state', () => {
	let state = requestReducer(mockHistory, {});

	expect(state).toEqual({
		data: null,
		error: null,
		history: [],
		loading: false,
	});
});

test('Request Reducer ADD works', () => {
	const history = mockHistory;

	let action = {
		type: ACTIONS.ADD,
		payload: {
			id: history.history.length,
			requestParams: mockRequestParams,
			data: mockData,
		},
	};
	let state = requestReducer(history, action);

	expect(state).toEqual({
		data: null,
		error: null,
		history: [{ id: 0, requestParams: mockRequestParams, data: mockData }],
		loading: false,
	});
});

test('Request Reducer REMOVE works', () => {
	let history = {
		data: null,
		error: null,
		history: [{ id: 0, requestParams: mockRequestParams, data: mockData }],
		loading: false,
	};

	let action = {
		type: ACTIONS.REMOVE,
		//! WHY DOES THIS ONLY WORK WITH ID 1????????
		payload: 1,
	};
	let state = requestReducer(history, action);

	expect(state).toEqual(mockHistory);
});

test('Request Reducer START_LOADING works', () => {
	const history = mockHistory;

	let action = {
		type: ACTIONS.START_LOADING,
	};
	let state = requestReducer(history, action);

	expect(state).toEqual({
		data: null,
		error: null,
		history: [],
		loading: true,
	});
});

test('Request Reducer STOP_LOADING works', () => {
	const history = {
		data: null,
		error: null,
		history: [],
		loading: true,
	};

	let action = {
		type: ACTIONS.STOP_LOADING,
	};
	let state = requestReducer(history, action);

	expect(state).toEqual({
		data: null,
		error: null,
		history: [],
		loading: false,
	});
});

test('Request Reducer SET_ERROR works', () => {
	const history = mockHistory;

	let action = {
		type: ACTIONS.SET_ERROR,
		payload: { message: 'message', code: 'error code' },
	};
	let state = requestReducer(history, action);

	expect(state).toEqual({
		data: null,
		error: { message: 'message', code: 'error code' },
		history: [],
		loading: false,
	});
});

test('Request Reducer SET_DATA works', () => {
	const history = mockHistory;

	let action = {
		type: ACTIONS.SET_DATA,
		payload: { message: 'message', code: 'error code' },
	};
	let state = requestReducer(history, action);

	expect(state).toEqual({
		data: { message: 'message', code: 'error code' },
		error: null,
		history: [],
		loading: false,
	});
});
