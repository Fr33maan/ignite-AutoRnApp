/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var imports = props.imports
var Name = props.Name
var subsNames = props.subsNames
var states = props.states
var name = props.name
var actions = props.actions
%>
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Auto generated imports block
<% for (let importString of imports) { %><%- importString %>
<% } %><%#
%><% if (states || actions) { %>
// stateInjector will connect actions and states to components through mapDispatchToProps / mapStateToProps / bindActionCreators / connect
import stateInjector from 'Lib/stateInjector'
@stateInjector(
  [
    <%- states.map(state => `'${state}'`).join(',\n\t\t') %>
  ], //states
  [<%= Name %>Actions] //actions
)
<% } %><%#
%>class <%= Name %>Container extends Component {
  <% for (let action of actions) { %>
  <%- action.name %> = ( <%- action.args.join(', ') %> ) => {
    this.props.actions.<%- action.name %>Request(<%- action.args.join(', ') %>)
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

export default <%= Name %>Container
