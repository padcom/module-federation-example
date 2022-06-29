import React from 'react'

export default function SayHelloFromB({ name = 'John' }, {}) {
  return <h1>Hello {name} from Application B!!!</h1>
}
