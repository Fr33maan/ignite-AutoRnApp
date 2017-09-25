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
import ModalActions from 'Redux/rdx.modals'
<% if (formAction) { %>import { Form, Control, Errors } from 'react-redux-form/native'
import { actions } from 'react-redux-form' <% } %>
<% for (let importString of imports) { %><%- importString %>
<% } %>
export default class <%= Name %> extends Component {<%#
  %><% if (navs && navs.length > 0) { %><%#
  %><%- include(props.dirname + '/../templates/partials/navsActions.ejs.jsx', {props: props}) %><%#
  %><% } %>
  render () {
    // State
    const {
      <%- states.join(',\n\t\t\t') %>
    } = this.props.parentProps
    <% if(actions) { %>
    // Actions    
    const {
      <%- actionsNames.join(',\n\t\t\t') %>
    } = this.props
    <% } %>
    return (
      <View style={styles.container}>
        <Text><%= Name %> Component</Text><%#
        %><% if(props.level !== 1) { %>{error<%- Name %> && (<Text>{error<%- Name %>}</Text>)}<% }
        if(formAction) { %>
        <%- include(props.dirname + '/../templates/partials/form.ejs.jsx', {props: props, formAction: formAction}) %><%#
        %><% }
        if (navs && navs.length > 0) { %>
        <%- include(props.dirname + '/../templates/partials/navsButtons.ejs.jsx', {props: props}) %><% } %>
      </View>
    )
  }
}
