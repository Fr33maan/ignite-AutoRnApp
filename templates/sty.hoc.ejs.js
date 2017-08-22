import { StyleSheet } from 'react-native'
import { Colors, Metrics } from 'Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.statusBar,
    backgroundColor: Colors.background
  },
  icon: {
    width: '100%',
    height: '100%'
  }
})
