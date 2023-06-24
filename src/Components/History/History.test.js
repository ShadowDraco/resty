import { render, screen } from '@testing-library/react'

import History from '.'

test('renders History', () => {
  render(<History />)
  const viewerElement = screen.getByText('Request History')
  expect(viewerElement).toBeInTheDocument()
})
