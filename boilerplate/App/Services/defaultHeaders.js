import { AsyncStorage } from 'react-native'

const baseHeaders = {
  'Cache-Control': 'no-cache'
}

async function defaultHeaders(){
  const authToken = await AsyncStorage.getItem('token')

  return {
    ...baseHeaders,
    authorization: 'Bearer ' + authToken
  }
}



module.exports = defaultHeaders
