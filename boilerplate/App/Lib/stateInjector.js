/**
 * @description: This function will connect all actions to components and selected states
*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

export default function(stateProps = [], actions = []){

  function mapStateToProps(state) {

    const props = {}

    stateProps.map(prop => {
      props[prop] = state[prop]
    })

    return props
  }

  function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch), dispatch }
  }


  return (Component) => connect(mapStateToProps, mapDispatchToProps)(Component)
}
