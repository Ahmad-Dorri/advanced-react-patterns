// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function callAll(...fns) {
  return function (...args) {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  function getTogglerProps({onClick, ...props} = {}) {
    return {
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }
  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  // const togglerProps = {'aria-pressed': on, onClick: toggle}
  return {on, toggle, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          onClick: () => console.log('button clicked'),
          'aria-label': 'custom-button',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
