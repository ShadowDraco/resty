import React, { useState } from 'react'

import './Form.scss'

export default function Form(props) {
  const handleSubmit = e => {
    e.preventDefault()
    props.handleApiCall({ url, method, body })
  }

  const [method, setMethod] = useState('GET')
  const [currentMethod, setCurrentMethod] = useState('GET')
  const [body, setBody] = useState({})
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')

  const updateUrl = e => {
    setUrl(e.target.value)
  }
  const updateMethod = e => {
    setMethod(e.target.innerText)
  }
  const updateCurrentMethod = value => {
    setCurrentMethod(value)
  }

  const updateBody = e => {
    setBody(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div></div>
        <label className='methods'>
          <span
            id='get'
            data-testid='form-get'
            className={currentMethod === 'GET' ? 'current' : ''}
            onClick={e => {
              updateMethod(e)
              updateCurrentMethod('GET')
            }}
          >
            GET
          </span>
          <span
            id='post'
            data-testid='form-post'
            className={currentMethod === 'POST' ? 'current' : ''}
            onClick={e => {
              updateMethod(e)
              updateCurrentMethod('POST')
            }}
          >
            POST
          </span>
          <span
            id='put'
            className={currentMethod === 'PUT' ? 'current' : ''}
            onClick={e => {
              updateMethod(e)
              updateCurrentMethod('PUT')
            }}
          >
            PUT
          </span>
          <span
            id='delete'
            className={currentMethod === 'DELETE' ? 'current' : ''}
            onClick={e => {
              updateMethod(e)
              updateCurrentMethod('DELETE')
            }}
          >
            DELETE
          </span>
        </label>

        {/* //* END METHODS */}

        <label className='inputs'>
          <div>
            <span>URL: </span>
            <input
              data-testid='form-url'
              name='url'
              type='text'
              onChange={updateUrl}
              value={url}
            />
          </div>
          {method !== 'GET' && (
            <div>
              <span>Body: </span>
              <textarea name='body' type='text' onChange={updateBody} />
            </div>
          )}
          <button data-testid='form-button' type='submit'>
            GO!
          </button>
        </label>
      </form>
    </>
  )
}
