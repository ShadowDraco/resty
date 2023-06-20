import { render, screen } from '@testing-library/react';

import Header from '.';

test('renders header title', () => {
	render(<Header />);
	const headerElement = screen.getByText('RESTy');
	expect(headerElement).toBeInTheDocument();
});
