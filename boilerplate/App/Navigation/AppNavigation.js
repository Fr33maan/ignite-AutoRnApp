import AutoAppConfig from 'Config/AutoApp.conf'
import styles from './Styles/NavigationStyles'
import { StyleSheet } from 'react-native'
import { TabNavigator } from 'react-navigation'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: AutoAppConfig.initialRoute,
  backBehavior: 'none',
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
