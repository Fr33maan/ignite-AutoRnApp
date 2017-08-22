const setTab = true
const setStack = true
const setEditable = true
const setForm = true

module.exports = {
  initialRoute : 'User', // Capitalized sub name - used in AppNavigation
  rootUrl: {
    dev: 'http://localhost:1337',
    prod: 'http://myprodhost.com'
  },
  subs : {
    user: {
      model: { // Will generate CRUD actions (redux, sagas, api)
          username: 'string',
          password: 'password',
          email: 'email',
          jwt: 'string',
          pictureUrl: 'picture'
      },
      subs: {
        auth: {
          subs: {
            authenticate: { // StackNavigator and imports
              navs: ['register', 'recover'], //  navigation actions
              props: ['email', 'password', 'jwt'], // states used in form and submitted to the saga/redux action // might be a dupe with model
              response: ['jwt'],
              setForm, // Component generation - not released
            },
            register: {
              navs: ['authenticate', 'recover'], // navigation actions
              props: ['username', 'email', 'password'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              setForm, // Component generation - not released
            },
            recover: {
              navs: ['authenticate', 'register'], //  navigation actions
              props: ['email'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              setForm, // Component generation - not released
            }
          }
        }
      }
    }
  }
}
