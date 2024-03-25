import { useEffect, useState } from 'react'
import { client } from './client'
import './App.css'

export function App() {
  const [greetings, setGreetings] = useState([])

  useEffect(() => {
    async function subscribe() {
      console.log('subscribe')

      const subscription = client.iterate({
        query: `subscription { greetings }`,
      })
      for await (const message of subscription) {
        setGreetings((prevGreetings) =>
          prevGreetings.concat(message.data?.greetings),
        )
      }
    }

    subscribe()
  }, [])

  return (
    <>
      <ul>
        {greetings.map((greeting, id) => (
          <li key={id}>{greeting}</li>
        ))}
      </ul>
    </>
  )
}
