// Simple React Native specific changes

import '../I18n/I18n'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  
  hosts: {
    development: 'http://192.168.0.40:1337',
    production: 'https://192.168.0.40:1337'
  }
}
