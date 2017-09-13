/**
 * @description: This function will connect all actions to components and selected states
*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

export default function(reducerName, stateProps = [], actions = []){

  function mapStateToProps(state) {

    const props = {}
    stateProps.map(prop => {
      props[prop] = state[reducerName][prop]
    })

    return props
  }

  function mapDispatchToProps(dispatch) {

    // We only take actions with "Request" in the name as we don't need Failure and Success actions
    const filteredActions = {}
    for (let actionName in actions) {
      const regExp = new RegExp('Request')
      if(regExp.test(actionName)) filteredActions[actionName] = actions[actionName]
    }

    return { actions: bindActionCreators(filteredActions, dispatch), dispatch }
  }


  return (Component) => connect(mapStateToProps, mapDispatchToProps)(Component)
}
