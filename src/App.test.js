import { render, screen } from '@testing-library/react';
import App from './App';

test('main page displays', () => {
	render(<App />);
	const formElement = screen.getByText(/URL:/i);
	expect(formElement).toBeInTheDocument();
	const historyElement = screen.getByText(/Request History:/i);
	expect(historyElement).toBeInTheDocument();
});
