import { createClient } from 'graphql-ws'

/**
 * Custom WebSocket implementation for graphql-ws to support msw.
 * It returns an instance of the globalThis.WebSocket in the constructor,
 *
 * When graphql-ws createClient is called, it stores the WebSocket implementation it will
 * use in a variable. If msw hasn't patched the WebSocket class at this point,
 * graphql-ws will use the original WebSocket and no interception will happen.
 */
class LazyWebSocket {
  static CLOSED = globalThis.WebSocket.CLOSED
  static CLOSING = globalThis.WebSocket.CLOSING
  static CONNECTING = globalThis.WebSocket.CONNECTING
  static OPEN = globalThis.WebSocket.OPEN

  constructor(...args) {
    console.log('lazy', globalThis.WebSocket)

    return new globalThis.WebSocket(...args)
  }
}

export const client = createClient({
  url: 'ws://localhost:5173/graphql',
  webSocketImpl: LazyWebSocket,
})

client.on('opened', () => {
  console.log('opened')
})

client.on('connecting', () => {
  console.log('connecting')
})

client.on('connected', () => {
  console.log('connected')
})

console.log('createdClient')
