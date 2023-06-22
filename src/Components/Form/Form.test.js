import { render, screen } from '@testing-library/react'

import Form from '.'

test('form exists', async () => {
  render(<Form handleApiCall={jest.fn()} />)

  // see if the form exists on the page
  const formSpan = screen.getByText('URL:')
  expect(formSpan).toBeTruthy()
  expect(formSpan).toBeInTheDocument()
})
