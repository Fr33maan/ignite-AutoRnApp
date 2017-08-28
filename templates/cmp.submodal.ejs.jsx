<%
var states = props.states
var Name = props.Name
var imports = props.imports
var subsNames = props.subsNames
var navs = props.navs
var actions = props.actions
var actionsNames = actions.map(action => action.name)

states = states.concat(props.name)
%>
import React, { Component } from 'react'
import { View, Text, Modal } from 'react-native'
import RoundedButton from 'Components/RoundedButton'
<% for (let importString of imports) { %><%- importString %>
<% } %>
export default class <%= Name %> extends Component {
  <% if (navs && navs.length > 0) {
  for (let nav of navs) { %>
  navTo<%- nav %> = () => {this.props.parentProps.navigation.navigate('<%- nav %>')}
  <% }} %>
  render () {
    const {
      <%- states.join(',\n\t\t\t') %>
    } = this.props.parentProps
    <% if(actions) { %>
    const {
      <%- actionsNames.join(',\n\t\t\t') %>
    } = this.props
    <% } %>
    return (
      <View style={styles.container}>
        <Text><%= props.Name %> Component</Text>
        <% if (navs && navs.length > 0) {
        for (let nav of navs) { %>
          <RoundedButton onPress={this.navTo<%- nav %>} text="<%- nav %>"/>
        <% }} %>
      </View>
    )
  }
}
