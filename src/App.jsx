import React, { useState, useEffect, useReducer } from 'react'

import './App.scss'

import Header from './Components/Header'
import Footer from './Components/Footer'
import Form from './Components/Form'
import Results from './Components/Results'

import axios from 'axios'
import History from './Components/History'

export const requestReducer = (state, action) => {
  console.log('reducing', state, action)
  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, history: [...state.history, action.payload] }
    case ACTIONS.REMOVE:
      return { ...state, history: state.history.splice(action.payload, 1) }
    case ACTIONS.START_LOADING:
      return (state.loading = true)
    case ACTIONS.STOP_LOADING:
      return (state.loading = false)
    default:
      return state
  }
}

export const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  START_LOADING: 'START-LOADING',
  STOP_LOADING: 'STOP-LOADING',
}

export default function App({ url }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [requestParams, setRequestParams] = useState({})
  const [error, setError] = useState(null)
  const [history, dispatch] = useReducer(requestReducer, [])

  const addRequest = (requestParams, requestData) => {
    console.log('adding request')
    let action = {
      type: ACTIONS.ADD,
      payload: { requestParams, requestData },
    }
    dispatch(action)
    dispatch({ type: ACTIONS.STOP_LOADING })
  }

  useEffect(() => {
    setLoading(true)
    dispatch(history, ACTIONS.START_LOADING)

    const doApiCall = async () => {
      try {
        if (requestParams.method) {
          if (url) requestParams.url = url
          let data = await axios(requestParams)

          setData(data)
          setError(null)
          addRequest(requestParams, data)
        }
      } catch (error) {
        console.log(error)
        setError({ message: error.message, code: error.code })
      }
    }
    // call the function
    doApiCall()

    setLoading(false)
  }, [history, requestParams, url])

  const callApi = requestParams => {
    setRequestParams(requestParams)
  }

  return (
    <React.Fragment>
      <Header />
      <div data-testid='app-method'>
        <small>Request Method: {requestParams.method}</small>
      </div>
      <div>
        <small>URL: {requestParams.url}</small>
      </div>
      <div className='form-history'>
        <History />
        <Form handleApiCall={callApi} />
        {error && (
          <p id='error'>
            {error.code && error.code}: {error.message}
          </p>
        )}
      </div>
      <Results data={data} loading={loading} setError={setError} url={url} />
      <Footer />
    </React.Fragment>
  )
}
