/*
This module will parse the response returned by apisauce
Use it to send a localized message to your user
*/
import I18n from 'I18n'

const responseParser = response => {
  // Parse your response as you want here

  if (response.problem === 'NETWORK_ERROR') {
    return 'your device is not connected to the internet or the server is unreachable'
  }

  return 'unknown error, please report it'
}

export default responseParser
