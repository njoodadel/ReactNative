import React from 'react'
import AppContainer from './Navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './store/reducers/reducer'

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}