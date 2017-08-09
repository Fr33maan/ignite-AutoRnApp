/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var imports = props.imports
var Name = props.Name
var subsNames = props.subsNames
%>
import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Auto generated block
<% for (let importString of imports) { %><%- importString %>
<% } %><%#
%>
class <%= Name %>Container extends Component {<%#
%><% for (let sub of subsNames) { %>
  open<%- sub.Name %> = () => {
    this.props.navigation.navigate('<%- sub.Name %>')
  }
  <% } %>
  render () {
    return (
      <View style={styles.container}>
        <<%= Name %>Component
        props={this.props}<%#
     %><% for (let sub of subsNames) { %>
        open<%- sub.Name %>={this.open<%- sub.Name %>}<% } %>
        />
      </View>
    )
  }
}

// StackNavigator - Here all subs are inserted into a navigator
export default StackNavigator({<%#
%><% for (let sub of subsNames) { %>
  <%- sub.Name %>: {screen: <%- sub.Name %>},<% } %>
},{
  cardStyle: {
    opacity: 1,
    backgroundColor: '#3e243f'
  },
  initialRouteName: '<%- subsNames[0].Name %>',
  headerMode: 'none',
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})
