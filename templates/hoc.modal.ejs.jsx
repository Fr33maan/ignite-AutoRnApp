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
import { View, TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

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
  <%= name %>Actions //actions
)
<% } %><%#
%>class <%= Name %>Container extends Component {
%><% for (let sub of subsNames) { %>
  navTo<%- sub.Name %> = () => {
    this.props.navigation.navigate('<%- sub.Name %>')
  }
  <% }
  if ('actions' in props && props.actions.length > 0) {
  for (let action of props.actions) { %>
  <%- action.name %> = (<%- action.args.join(', ') %>) => {
     this.props.actions.<%- action.name %>Request(<%- action.args.join(', ') %>)
  }
  <% }} %>
  render () {
    return (
      <View style={styles.container}>
        <<%= Name %>Component
        parentProps={this.props}<%#
      %><% for (let sub of subsNames) { %>
        open<%- sub.Name %>={this.open<%- sub.Name %>}<% } %>
        <% for (let action of props.actions) { %><%#
        %><%- action.name %>={this.<%- action.name %>}
        <% } %><%#
        %>/>
      </View>
    )
  }
}

<% if (subsNames.length > 0) { %>
  // StackNavigator - Here all subs are inserted into a navigator
  export default StackNavigator({<%#
  %><% for (let sub of subsNames) { %>
    <%- sub.Name %>: {screen: <%- sub.Name %>},<% } %>
  },{
    cardStyle: {
      opacity: 1,
      backgroundColor: '#3e243f'
    },
    initialRouteName: '<%- subsNames[0].Name %>',
    headerMode: 'none',
    navigationOptions: {
      header: {
        left: (
          <TouchableOpacity onPress={() => window.alert('pop')} ><Image style={{marginHorizontal: 10}} /></TouchableOpacity>
        ),
        style: {
          backgroundColor: '#3e243f'
        }
      }
    }
  })
<% } else { %>
export default <%= Name %>Container
<% } %>
