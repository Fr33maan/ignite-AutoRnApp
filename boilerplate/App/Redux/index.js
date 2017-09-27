import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form' // Used by AutoRnApp if you use forms
import configureStore from './CreateStore'
import rootSaga from 'Sagas'
import NavigationReducers from 'Redux/rdx.navigation'
import * as ModalsReducers from 'Redux/rdx.modals'

// AutoRnApp patches imports here

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: NavigationReducers, 
    modals: ModalsReducers.reducer,

    // Don't put anything under this line -> this is where AutoRnApp patches the file
    // AutoRnApp reducers
    ...createForms({
      // AutoRnApp forms reducers
    })
  })

  return configureStore(rootReducer, rootSaga)
}
