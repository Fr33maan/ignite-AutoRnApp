import React, { Component } from 'react'
import { View, Image } from 'react-native'
import PngIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class AsyncIcon extends Component {
  colors = ['#ff1471', '#ed1264', '#e81260', '#db1056', '#ce104c', '#c00e41', '#b70d3a']
  active = false
  
  constructor (props) {
    super(props)
    this.state = {
      source: null,
    }
    PngIcon.getImageSource(this.props.iconName, 25, '#f7196e').then(source => {
      this.setState({ source })
    });
  }
  
  render () {
    const { style, focused, tintColor } = this.props
    return (
      <Image
      source={this.state.source}
      style={[style, {tintColor}]}
      />
    )
  }
}