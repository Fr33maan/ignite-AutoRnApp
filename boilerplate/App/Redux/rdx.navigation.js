// https://medium.com/@parkerdan/react-navigation-with-complete-redux-state-management-tab-bar-and-multiple-navigators-ed30a69d9a4d 
import { combineReducers } from 'redux' 
import AppNavigation from '../Navigation/AppNavigation' 
// AutoRnApp imports of DrawerNavigators
 
export default combineReducers({ 
  tabNav: (state, action) => { 
    return AppNavigation.router.getStateForAction(action, state) 
  }, 
 
  // Don't put anything under this line -> this is where AutoRnApp patches the file 
  // AutoRnApp Nav reducers for modals 
})