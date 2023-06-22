import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import App from '../App'

test('page updates when form submitted', async () => {
  render(<App />)

  let button = screen.getByTestId('form-button')
  // Click button
  fireEvent.click(button)

  // Wait for page to update with query text
  const response = await screen.findByTestId('results')
  expect(response).toBeInTheDocument()
  expect(response).toHaveTextContent('Dad joke:')
})

test('Changing the method and url works', async () => {
  render(<App />)

  let urlInput = screen.getByTestId('form-url')
  let getButton = screen.getByTestId('form-get')
  let postButton = screen.getByTestId('form-post')
  // Click button
  fireEvent.click(postButton)

  expect(postButton).toHaveClass('current')
  expect(getButton.classList.contains('current')).toBeFalsy()
  expect(urlInput).toHaveValue('https://pokeapi.co/api/v2/pokemon/')
})
