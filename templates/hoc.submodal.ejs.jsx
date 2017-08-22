/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var imports = props.imports
var Name = props.Name
var name = props.name
var actions = props.actions
var states = props.states
%>
import React, { Component } from 'react'
import { View } from 'react-native'
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
        parentProps={this.props}<%#
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
