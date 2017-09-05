<%
var states = props.states
var Name = props.Name
var imports = props.imports
var subsNames = props.subsNames
var navs = props.navs
var actions = props.actions
var actionsNames = actions.map(action => action.name)

var formAction = false
for (let action of actions) {
  if (action.isForm) {
    formAction = action
    break
  }
}
%>
import React, { Component } from 'react'
import { View, Text, Modal, Button } from 'react-native'
import RoundedButton from 'Components/RoundedButton'
<% if (formAction) { %>import { Form, Control } from 'react-redux-form/native'
import { actions } from 'react-redux-form' <% } %>
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
        <% if(formAction) { %>
          <Form model="<%- formAction.name %>" onSubmit={<%- formAction.name %>}>
          <% for (let argName of formAction.args) { %>
            <Control.TextInput model=".<%- argName %>" />
          <% } %>
            <Button title="<%- formAction.Name %>" onPress={() => this.props.parentProps.dispatch(actions.submit('<%- formAction.name %>'))}  />
          </Form>
        <% } %>
        <% if (navs && navs.length > 0) {
        for (let nav of navs) { %>
          <RoundedButton onPress={this.navTo<%- nav %>} text="<%- nav %>"/>
        <% }} %>
      </View>
    )
  }
}
