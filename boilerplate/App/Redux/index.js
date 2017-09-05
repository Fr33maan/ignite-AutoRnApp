import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form' // Used by AutoRnApp if you use forms
import configureStore from './CreateStore'
import rootSaga from 'Sagas'

// AutoRnApp patches imports here

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,

    // Don't put anything under this line -> this is where AutoRnApp patches the file
    // AutoRnApp reducers
    ...createForms({
      // AutoRnApp forms reducers
    })
  })

  return configureStore(rootReducer, rootSaga)
}
