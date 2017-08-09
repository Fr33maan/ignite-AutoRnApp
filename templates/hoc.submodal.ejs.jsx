import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


// Auto generated block
<% for (let importString of imports) { %><%- importString %>
<% } %>

class <%= Name %>Container extends Component {
  <% for (let action of actions) { %>
  <%- action.name %> ( <%- action.args.join(', ') %> ) {
    this.props.<%- action.name %>(<%- action.args.join(', ') %>)
  }
  <% }  %>
  render () {
    return (
      <View style={styles.container}>
        <<%= Name %>Component
        props={this.props}<%#
     %><% for (let action of actions) { %>
        <%- action.name %>={this.<%- action.name %>}<% } %>
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    <% for (let state of states) { %><%- state %>: false,
    <% } %>
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(<%- name %>Request, dispatch), dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= Name %>Container)
