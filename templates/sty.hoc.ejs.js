import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.statusBar,
    backgroundColor: Colors.background,
  },
  icon: {
    width: '100%',
    height: '100%'
  }
})
