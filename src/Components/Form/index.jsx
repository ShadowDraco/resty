import React, { useState } from 'react'

import './Form.scss'

export default function Form(props) {
  const handleSubmit = e => {
    e.preventDefault()
    props.handleApiCall({ url, method, body })
  }

  const [method, setMethod] = useState('GET')
  const [body, setBody] = useState({})
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')

  const updateUrl = e => {
    setUrl(e.target.value)
  }
  const updateMethod = e => {
    setMethod(e.target.innerText)
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
            className={method === 'GET' ? 'current' : ''}
            onClick={updateMethod}
          >
            GET
          </span>
          <span
            id='post'
            data-testid='form-post'
            className={method === 'POST' ? 'current' : ''}
            onClick={updateMethod}
          >
            POST
          </span>
          <span
            id='put'
            className={method === 'PUT' ? 'current' : ''}
            onClick={updateMethod}
          >
            PUT
          </span>
          <span
            id='delete'
            className={method === 'DELETE' ? 'current' : ''}
            onClick={updateMethod}
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
