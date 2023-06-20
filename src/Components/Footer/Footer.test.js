import { render, screen } from '@testing-library/react';

import Footer from '.';

test('renders footer text', () => {
	render(<Footer />);
	const footerElement = screen.getByText(/© 2018/i);
	expect(footerElement).toBeInTheDocument();
});
