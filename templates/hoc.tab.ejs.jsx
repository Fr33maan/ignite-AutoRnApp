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
<% } 
if(subsNames.length > 0) { %>import ModalsActions from 'Redux/rdx.modals'<% } 
if (states || actions) { %>
// stateInjector will connect actions and states to components through mapDispatchToProps / mapStateToProps / bindActionCreators / connect
import stateInjector from 'Lib/stateInjector'
@stateInjector(
  [ //states
    'nav',
    <%- states.map(state => `'${name}.${state}'`).join(',\n\t\t') %>,
    <% if(subsNames.length > 0) { %><%#
    %><%- subsNames.map(subName => `'modals.show${subName.Name}Modal',\n\t\t'modals.${subName.name}ModalParams'`).join(',\n\t\t') %>
    <% } %>
  ], [ //actions
    <% if(actions.length > 0) { %><%- name %>Actions, 
    <% } if(subsNames.length > 0) { %>ModalsActions<% } %>
  ]
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
  <% for (let action of actions) { %>
  <%- action.name %> (<% if(action.args.length > 0) { %>{ <%- action.args.join(', ') %> }<% } %>) {
     this.props.actions.<%- action.name %>Request(<%- action.args.join(', ') %>)
  }
  <% } %>
  render () {
    return (
      <View style={styles.container}>
        <<%= Name %>Component
        parentProps={this.props}
        nav={this.props.nav}
        <% for (let sub of subsNames) { %><%#
        %>toggle<%- sub.Name %>Modal={() => this.props.actions.toggle<%- sub.Name %>Modal()}
        open<%- sub.Name %>Modal={() => this.props.actions.open<%- sub.Name %>Modal()}
        close<%- sub.Name %>Modal={() => this.props.actions.close<%- sub.Name %>Modal()}
        show<%- sub.Name %>Modal={this.props.show<%- sub.Name %>Modal}
        <%- sub.name %>ModalParams={this.props.<%- sub.name %>ModalParams}
        <% } %><% for (let action of actions) { %><%#
        %><%- action.name %>={this.<%- action.name %>}
        <% } %><%#
        %>/>
      </View>
    )
  }
}

export default <%= Name %>Container
