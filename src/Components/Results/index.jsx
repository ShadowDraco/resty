import React, { useState, useEffect } from 'react'
import JSONPretty from 'react-json-pretty'
import axios from 'axios'

import './Results.scss'

export default function Results({ setError, loading, url, data }) {
  var JSONPrettyMon = require('react-json-pretty/dist/monikai')
  const [joke, setJoke] = useState(null)

  useEffect(() => {
    // set the data with a dad joke when the page first starts before a real API call is given
    const fetchJoke = async () => {
      const newUrl = url || 'https://icanhazdadjoke.com/'

      let joke = await axios.get(newUrl, {
        headers: {
          Accept: 'application/json',
        },
      })

      setJoke(joke.data.joke)
    }

    try {
      fetchJoke()
    } catch (error) {
      console.log(error)
      setError({ message: error.message, code: error.code })
    }
  }, [url, setError])

  return (
    <section className='results' data-testid='results-section'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data ? (
            <JSONPretty
              id='json-pretty'
              data-testid='API-RESULT'
              theme={JSONPrettyMon}
              data={data}
            ></JSONPretty>
          ) : joke ? (
            <>
              Dad Joke:
              <JSONPretty
                id='json-pretty'
                data-testid='DAD-JOKE'
                theme={JSONPrettyMon}
                data={joke}
              ></JSONPretty>
            </>
          ) : (
            'Loading dad joke...'
          )}
        </>
      )}
    </section>
  )
}
