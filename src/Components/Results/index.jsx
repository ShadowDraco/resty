import React, { useState, useEffect } from 'react'
import JSONPretty from 'react-json-pretty'
import axios from 'axios'

import './Results.scss'

export default function Results(props) {
  var JSONPrettyMon = require('react-json-pretty/dist/monikai')
  const [data, setData] = useState(null)

  useEffect(() => {
    // set the data with a dad joke when the page first starts before a real API call is given
    const fetchJoke = async () => {
      const url = props.url || 'https://icanhazdadjoke.com/'

      let data = await axios.get(url, {
        headers: {
          Accept: 'application/json',
        },
      })

      setData(data.data.joke)
    }

    try {
      fetchJoke()
    } catch (error) {
      console.log(error)
      props.setError({ message: error.message, code: error.code })
    }
  }, [])

  return (
    <section className='results' data-testid='results-section'>
      {props.loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {props.data ? (
            <JSONPretty
              id='json-pretty'
              data-testid='API-RESULT'
              theme={JSONPrettyMon}
              data={props.data}
            ></JSONPretty>
          ) : data ? (
            <>
              Dad Joke:
              <JSONPretty
                id='json-pretty'
                data-testid='DAD-JOKE'
                theme={JSONPrettyMon}
                data={data}
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
