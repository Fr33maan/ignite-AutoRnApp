import React, { Component } from 'react'
import { View, Text, Modal } from 'react-native'
<% for (let importString of props.imports) { %><%- importString %>
<% } %>
export default class <%= props.Name %> extends Component {
  render () {
    const {
      <%- props.states.join(',\n\t\t\t') %>
    } = this.props.parentProps

    return (
      <View style={styles.container}>
        <Text><%= props.Name %> Component</Text>
      </View>
    )
  }
}
