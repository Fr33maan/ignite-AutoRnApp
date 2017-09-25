<%
var states = props.states
var Name = props.Name
var imports = props.imports
var subsNames = props.subsNames
var propsAssigns = subsNames.map(sub => `show${sub.Name}Modal,\n\t\t\ttoggle${sub.Name}Modal,\n\t\t\topen${sub.Name}Modal,\n\t\t\tclose${sub.Name}Modal,\n\t\t\t${sub.name}ModalParams`).join(', \n\t\t\t')
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
import { View, Text, Modal, Button } from 'react-native'
import { addNavigationHelpers } from 'react-navigation' 
import validators from 'Lib/formValidators'
import RoundedButton from 'Components/RoundedButton'
<% if (formAction) { %>import { Form, Control, Errors } from 'react-redux-form/native' <% } %>
<% for (let importString of imports) { %><%- importString %>
<% }
if(subsNames && subsNames.length > 0) {
for (let sub of subsNames) { %>import <%- sub.Name %>Container from 'Screens/<%- Name %>/<%- sub.Name %>/<%- sub.Name %>'
<% }} %>

export default class <%= Name %> extends Component {
  render () {
    // State
    const {
      nav,
      <%- states.join(',\n\t\t\t') %>
    } = this.props.parentProps
    <% if(subsNames && subsNames.length > 0) { %>
    // modalProps and actions      
    const {
      <%- propsAssigns %>
    } = this.props
    <% }
    if(actions && actions.length > 0) { %>
    // Actions
    const {
      <%- actionsAssign %>
    } = this.props
    <% } %>
    return (
      <View style={styles.container}>
        <Text><%= props.Name %> Component</Text>
        <% if(formAction) { %>
        <%- include(props.dirname + '/../templates/partials/form.ejs.jsx', {props: props, formAction: formAction}) %>
        <% }
        if(subsNames && subsNames.length > 0) {
        for (let sub of subsNames) { %>
          <RoundedButton onPress={open<%- sub.Name %>Modal}>
            Open <%- sub.Name %> Modal
          </RoundedButton>
          <Modal
            visible={show<%- sub.Name %>Modal}
            onRequestClose={close<%- sub.Name %>Modal}>
            <<%- sub.Name %>Container 
            navigation={ 
              addNavigationHelpers({ 
                dispatch: this.props.parentProps.dispatch, 
                state: this.props.nav.<%- sub.name %>Nav 
              }) 
            }
            screenProps={{
              modalName: '<%- sub.NAME %>',
              params: <%- sub.name %>ModalParams
            }}
            />
          </Modal>
        <% }} %>
      </View>
    )
  }
}
