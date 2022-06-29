import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

function loadExternalContainer(name, entry, url) {
  return new Promise((resolve, reject) => {
    const element = document.createElement('script')

    element.src = url
    element.type = 'text/javascript'
    element.async = true

    element.onload = () => {
      element.parentElement.removeChild(element)
      resolve(window[name])
    }
    element.onerror = (error) => {
      element.parentElement.removeChild(element)
      reject(error)
    }

    document.head.appendChild(element)
  })
}

async function main() {
  await __webpack_init_sharing__('default')
  const container = await loadExternalContainer('application_b', './main', 'http://localhost:3002/remoteEntry.js')
  container.init(__webpack_share_scopes__.default)
  const library = await container.get('./main')
  const SayHelloFromB = library().default

  ReactDOM.render(
    <>
      <App />
      <SayHelloFromB name="Jane" />
    </>,
    document.getElementById('root')
  )
}

main()
