import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from 'Themes'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  textHolder: {
    position: 'absolute',
    right: '25%',
    bottom: 0,
    backgroundColor: Colors.blue,
    padding: 0.2,
    borderRadius: 50,
    height: 13,
    width: 13
  },
  label: {
    width: '100%',
    textAlign: 'center',
    fontSize: 9,
    color: 'black',
    fontWeight: 'bold'
  }
})

export default class NotifLabel extends Component {
  notificationsCount = 0
  
  constructor( props ){
    super(props)
    global.notificationsHandler[props.name] = this
  }
  
  incrementNotif = numberOfNotif => {
    if( numberOfNotif ){
      this.notificationsCount += numberOfNotif
      
    }else{
      this.notificationsCount++
    }

    this.forceUpdate()
  }
  
  resetNotifs = () => {
    this.notificationsCount = 0
    this.forceUpdate()
  }
  
  render () {
    const { focused, tintColor } = this.props
    const containerStyle = this.notificationsCount <= 99 ? styles.textHolder : [styles.textHolder, {width: 20}]
    
    return (
      <View style={styles.container}>
        {
          this.notificationsCount > 0 && (
            <View style={containerStyle}>
              <Text style={styles.label}>{this.notificationsCount}</Text>
            </View>
          )
        }
      </View>
    )
  }
}