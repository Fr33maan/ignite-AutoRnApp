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
  <% } %><%#
  %><% for (let sub of subsNames) { %>
  toggle<%- sub.Name %>Modal = () => {
    this.setState({ show<%- sub.Name %>Modal: !this.state.show<%- sub.Name %>Modal })
  }
  <% } %>
  render () {
    return (
      <View style={styles.container}>
        <<%= Name %>Component
        props={this.props}
        <% for (let sub of subsNames) { %><%#
        %>toggle<%- sub.Name %>Modal={this.toggle<%- sub.Name %>Modal}<%#
        %><% } %>
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
  return { actions: bindActionCreators(<%- name %>Actions, dispatch), dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= Name %>Container)
