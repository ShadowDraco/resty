import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('main page displays', () => {
	render(<App />);
	const divElement = screen.getByText(/Request Method:/i);
	expect(divElement).toBeInTheDocument();
});

test('page updates when form submitted', async () => {
	render(<App />);
	// Click button
	fireEvent.click(screen.getByText('GO!'));

	// Wait for page to update with query text
	const response = await screen.findByTestId('results');
	expect(response).toBeInTheDocument();
});
