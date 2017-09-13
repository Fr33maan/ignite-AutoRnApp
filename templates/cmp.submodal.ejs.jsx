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
import validators from 'Lib/formValidators'
<% if (formAction) { %>import { Form, Control, Errors } from 'react-redux-form/native'
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
        <Text><%= Name %> Component</Text>
        {error<%- Name %> && (<Text>{error<%- Name %>}</Text>)}
        <% if(formAction) { %>
          <Form model="<%- formAction.name %>Form" onSubmit={<%- formAction.name %>}>
          <% for (let argName of formAction.args) { %>
            <Control.TextInput
              model=".<%- argName %>"
              placeholder="<%- argName %>"
              validators={{
                isRequired: validators.isRequired('<%- argName %>').fn,
                <% if(argName === 'email')    { %>isEmail: validators.isEmail('<%- argName %>').fn,<% }
                   if(argName === 'password') { %>minLength: validators.minLength('<%- argName %>', 6).fn,<% } %>
              }}
            />
            <Errors
              model="<%- formAction.name %>Form.<%- argName %>"
              show={{submitFailed: true}}
              messages={{
                isRequired: validators.isRequired('<%- argName %>').msg,
                <% if(argName === 'email')    { %>isEmail: validators.isEmail('<%- argName %>').msg,<% }
                   if(argName === 'password') { %>minLength: validators.minLength('<%- argName %>', 6).msg,<% } %>
              }}
            />
          <% } %>
            <Button title="<%- formAction.Name %>" onPress={() => this.props.parentProps.dispatch(actions.submit('<%- formAction.name %>Form'))}  />
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
