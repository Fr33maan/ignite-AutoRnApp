<%
var states = props.states
var Name = props.Name
var imports = props.imports
var subsNames = props.subsNames
var propsAssigns = subsNames.map(sub => `show${sub.Name}Modal,\n\t\t\ttoggle${sub.Name}Modal`).join(', \n\t\t\t')
var actions = props.actions
var actionsAssign = actions.map(action => action.name).join(', \n\t\t\t')
var formAction = false
for (let action of actions) {
  if (action.isForm) {
    formAction = action
    break
  }
}
%>
import React, { Component } from 'react'
import { View, Text, Modal } from 'react-native'
import RoundedButton from 'Components/RoundedButton'
<% if (formAction) { %>import { Form, Control } from 'react-redux-form/native' <% } %>
<% for (let importString of imports) { %><%- importString %>
<% }
if(subsNames && subsNames.length > 0) {
for (let sub of subsNames) { %>import <%- sub.Name %>Container from 'Screens/<%- Name %>/<%- sub.Name %>/<%- sub.Name %>'
<% }} %>

export default class <%= Name %> extends Component {
  render () {
    const {
      <%- states.join(',\n\t\t\t') %>
    } = this.props.parentProps
    <% if(subsNames && subsNames.length > 0) { %>
    const {
      <%- propsAssigns %>
    } = this.props
    <% }
    if(actions && actions.length > 0) { %>
    const {
      <%- actionsAssign %>
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
          </Form>
        <% } %>
        <% if(subsNames && subsNames.length > 0) {
        for (let sub of subsNames) { %>
          <RoundedButton onPress={toggle<%- sub.Name %>Modal}>
            Open <%- sub.Name %> Modal
          </RoundedButton>
          <Modal
            visible={show<%- sub.Name %>Modal}
            onRequestClose={toggle<%- sub.Name %>Modal}>
            <<%- sub.Name %>Container />
          </Modal>
        <% }} %>
      </View>
    )
  }
}
