import AutoAppConfig from 'Config/AutoApp.conf'
import styles from './Styles/NavigationStyles'
import { StyleSheet } from 'react-native'
import { TabNavigator } from 'react-navigation'
import Home from 'Screens/Home/Home'
import Ranking from 'Screens/Ranking/Ranking'
import Chat from 'Screens/Chat/Chat'
import Matcher from 'Screens/Matcher/Matcher'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  Home: { screen: Home },
  Ranking: { screen: Ranking },
  Chat: { screen: Chat },
  Matcher: { screen: Matcher },

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: AutoAppConfig.initialRoute,
  navigationOptions: {
    headerStyle: styles.header,
  },
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon : true,
    style: {
      backgroundColor: 'red',
    }
  },
})

export default PrimaryNav
