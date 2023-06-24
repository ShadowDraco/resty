import React from 'react';
import App from '../App';

// mock api calls with MSw
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const mockPokemonData = {
	count: 1281,
	next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
	previous: null,
	results: [
		{
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon/1/',
		},
	],
};

const server = setupServer(
	rest.get('/pokemon', async (req, res, ctx) => {
		return res(ctx.json(mockPokemonData));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
//* */ end MSW setup

test('Changing the method and url works', async () => {
	render(<App url='/pokemon' />);

	let urlInput = screen.getByTestId('form-url');
	let getButton = screen.getByTestId('form-get');
	let postButton = screen.getByTestId('form-post');
	// Click button
	fireEvent.click(postButton);

	expect(postButton).toHaveClass('current');
	expect(getButton.classList.contains('current')).toBeFalsy();
	expect(urlInput).toHaveValue('https://pokeapi.co/api/v2/pokemon/');
});

test('page updates when form submitted', async () => {
	render(<App url='/pokemon' />);

	let button = screen.getByTestId('form-button');
	// submit form
	fireEvent.click(button);

	const response = await screen.findByTestId('API-RESULT');

	expect(response).toBeInTheDocument();
});

test('history updates when request happens', async () => {
	render(<App url='/pokemon' />);

	let button = screen.getByTestId('form-button');
	fireEvent.click(button);

	const response = await screen.findAllByTestId('history-entry');
	expect(response).toHaveLength(2);
	expect(response[1]).toHaveTextContent('Request Method: GETURL: /pokemon');
});
