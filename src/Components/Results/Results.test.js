import Results from '.';
// mock api calls with MSw
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const server = setupServer(
	rest.get('/joke', async (req, res, ctx) => {
		return res(
			ctx.json({
				id: 'R7UfaahVfFd',
				joke: 'My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.',
				status: 200,
			})
		);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders results section', () => {
	render(
		<Results
			url='/joke'
			addRequest={jest.fn()}
		/>
	);
	const sectionElement = screen.getByTestId('results-section');
	expect(sectionElement).toBeInTheDocument();
});

test('use effect successful', async () => {
	render(
		<Results
			url='/joke'
			addRequest={jest.fn()}
		/>
	);

	const responseElement = await screen.findByTestId('DAD-JOKE');
	expect(responseElement).toBeInTheDocument();
});
