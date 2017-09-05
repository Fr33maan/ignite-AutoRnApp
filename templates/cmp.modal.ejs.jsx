<%
var states = props.states
var Name = props.Name
var imports = props.imports
var subsNames = props.subsNames
var propsAssigns = subsNames.map(sub => `show${sub.Name}Modal,\n\t\t\ttoggle${sub.Name}Modal`).join(', \n\t\t\t')
%>

import React, { Component } from 'react'
import { View, Text } from 'react-native'
<% for (let importString of imports) { %><%- importString %>
<% } %>

export default class <%- Name %> extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text><%- Name %> Component</Text>
      </View>
    )
  }
}
