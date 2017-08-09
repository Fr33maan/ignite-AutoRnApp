import React, { Component } from 'react'
import { View, Text } from 'react-native'
<% for (let importString of props.imports) { %><%- importString %>
<% } %>
export default class <%= props.Name %> extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text><%= props.Name %> Component</Text>
      </View>
    )
  }
}
