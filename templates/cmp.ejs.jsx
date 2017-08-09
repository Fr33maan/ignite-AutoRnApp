import React, { Component } from 'react'
import { View, Text } from 'react-native'
<% for (let importString of imports) { %><%- importString %>
<% } %>
export default class <%= Name %> extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text><%= Name %> Component</Text>
      </View>
    )
  }
}
