import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { TabNavigator } from 'react-navigation'

import { Images } from '../Themes'

import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              Great job ! You can now develop your ignite app with expo debuging !
              It has been a hard task but you succeded well, I'm proud of you, of me.
              Now let's work !
            </Text>
          </View>

          <DevscreensButton />
        </ScrollView>
      </View>
    )
  }
}

//
//
// class MyHomeScreen extends React.Component {
//   static navigationOptions = {
//     tabBarLabel: 'Home',
//     // Note: By default the icon is only shown on iOS. Search the showIcon option below.
//     tabBarIcon: ({ tintColor }) => (
//       <Image
//         source={require(Images.launch)}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };
//
//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     );
//   }
// }
//
// class MyNotificationsScreen extends React.Component {
//   static navigationOptions = {
//     tabBarLabel: 'Notifications',
//     tabBarIcon: ({ tintColor }) => (
//       <Image
//         source={require(Images.launch)}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };
//
//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.goBack()}
//         title="Go back home"
//       />
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   icon: {
//     width: 26,
//     height: 26,
//   },
// });
//
// const MyApp = TabNavigator({
//   Home: {
//     screen: MyHomeScreen,
//   },
// }, {
//   tabBarOptions: {
//     activeTintColor: '#e91e63',
//   },
// });
//
// export default const LaunchScreen = MyApp
