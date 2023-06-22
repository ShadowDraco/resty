import React from 'react'
import Results from '.'
// mock api calls with MSw
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const server = setupServer(
  rest.get('/joke', async (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'R7UfaahVfFd',
        joke: 'My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.',
        status: 200,
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('use effect successful', async () => {
  render(<Results url='/joke' />)

  // Wait for the mocked API response to be displayed in the component
  //await waitFor(() => {
  const responseElement = await screen.findByTestId('DAD-JOKE')
  expect(responseElement).toBeInTheDocument()
  //})
})

test('renders results section', () => {
  render(<Results url='/joke' />)
  const sectionElement = screen.getByTestId('results-section')
  expect(sectionElement).toBeInTheDocument()
})
