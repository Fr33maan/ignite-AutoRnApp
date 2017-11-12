import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { ApplicationStyle } from 'Themes/ApplicationStyles'
import { Colors } from 'Themes'

export default class AsyncIcon extends Component {
  render () {
    const color = Colors.activePink || 'black'
    
    return (
      <View style={ApplicationStyle.fullSize}>
        <View style={ApplicationStyle.ActivityIndicator}>
          <ActivityIndicator size={"large"} color={color}/>
        </View>
      </View>
    )
  }
}