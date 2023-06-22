import React, { useState, useEffect } from 'react'

import './App.scss'

import Header from './Components/Header'
import Footer from './Components/Footer'
import Form from './Components/Form'
import Results from './Components/Results'

import axios from 'axios'

export default function App({ url }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [requestParams, setRequestParams] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    const doApiCall = async () => {
      try {
        if (requestParams.method) {
          if (url) requestParams.url = url
          let data = await axios(requestParams)

          setData(data)
          setError(null)
        }
      } catch (error) {
        console.log(error)
        setError({ message: error.message, code: error.code })
      }
    }
    // call the function
    doApiCall()

    setLoading(false)
  }, [requestParams])

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

      <Form handleApiCall={callApi} />
      {error && (
        <p id='error'>
          {error.code && error.code}: {error.message}
        </p>
      )}
      <Results data={data} loading={loading} setError={setError} url={url} />
      <Footer />
    </React.Fragment>
  )
}
