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
      let data = await axios.get('https://icanhazdadjoke.com/', {
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
    <section className='results'>
      {props.loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <pre data-testid='results'>
            {props.data ? (
              <JSONPretty
                id='json-pretty'
                theme={JSONPrettyMon}
                data={props.data}
              ></JSONPretty>
            ) : data ? (
              <JSONPretty
                id='json-pretty'
                theme={JSONPrettyMon}
                data={data}
              ></JSONPretty>
            ) : (
              'Loading dad joke...'
            )}
          </pre>
        </>
      )}
    </section>
  )
}
