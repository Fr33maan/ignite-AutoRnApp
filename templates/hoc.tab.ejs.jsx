/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var imports = props.imports
var Name = props.Name
var name = props.name
var actions = props.actions
var subsNames = props.subsNames
var states = props.states
%>
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import Images from 'Images'

// Auto generated imports block
<% for (let importString of imports) { %><%- importString %>
<% } %><%#
%><% if (states || actions) { %>
// stateInjector will connect actions and states to components through mapDispatchToProps / mapStateToProps / bindActionCreators / connect
import stateInjector from 'Lib/stateInjector'
@stateInjector(
  '<%- name %>',
  [
    <%- states.map(state => `'${state}'`).join(',\n\t\t') %>
  ], //states
  <% if(actions.length > 0) { %><%= name %>Actions //actions <% } %>
)
<% } %><%#
%>class <%= Name %>Container extends Component {
  static navigationOptions = {
    tabBarLabel: '<%- Name %>',
    tabBarIcon: ({tintColor, focused}) => (
      <Image
        source={Images.base_icon}
        style={[styles.icon, {tintColor}]}
      />
    ),
  }
  <% if(subsNames && subsNames.length > 0) { %>
  constructor (props) {
    super(props)
    this.state = {
    <% for (let sub of subsNames) { %>
      show<%- sub.Name %>Modal: false,<%#
    %><% } %>
    }
  }
  <% }
  for (let action of actions) { %>
  <%- action.name %> ({ <%- action.args.join(', ') %> }) {
     this.props.actions.<%- action.name %>Request(<%- action.args.join(', ') %>)
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
        parentProps={this.props}
        <% for (let sub of subsNames) { %><%#
        %>toggle<%- sub.Name %>Modal={this.toggle<%- sub.Name %>Modal}
        show<%- sub.Name %>Modal={this.state.show<%- sub.Name %>Modal}
        <% } %><% for (let action of actions) { %><%#
        %><%- action.name %>={this.<%- action.name %>}
        <% } %><%#
        %>/>
      </View>
    )
  }
}

export default <%= Name %>Container
