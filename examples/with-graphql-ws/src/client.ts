import { createClient } from 'graphql-ws'

export const client = createClient({
  url: 'ws://localhost:5173/graphql',
  // lazy: true, // Doesn't change anything
})

client.on('connecting', () => {
  console.log('connecting')
})

client.on('connected', () => {
  console.log('connected')
})

console.log('createdClient')
