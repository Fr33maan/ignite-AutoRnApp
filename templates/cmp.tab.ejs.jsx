<%
var states = props.states
var Name = props.Name
var imports = props.imports
var subsNames = props.subsNames
var propsAssigns = subsNames.map(sub => `show${sub.Name}Modal,\n\t\t\ttoggle${sub.Name}Modal`).join(', \n\t\t\t')
%>

import React, { Component } from 'react'
import { View, Text, Modal } from 'react-native'
import RoundedButton from 'Components/RoundedButton'
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
    <% } %>

    return (
      <View style={styles.container}>
        <Text><%= props.Name %> Component</Text>
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
