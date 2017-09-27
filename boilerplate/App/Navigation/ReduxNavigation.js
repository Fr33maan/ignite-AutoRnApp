import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'

// here is our redux-aware our smart component
function ReduxNavigation (props) {
  const { dispatch, tabNav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: tabNav
  })

  return <AppNavigation navigation={navigation} />
}

const mapStateToProps = state => ({ tabNav: state.nav.tabNav })
export default connect(mapStateToProps)(ReduxNavigation)
