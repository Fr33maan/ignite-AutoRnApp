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
    matcher: {
      actions: {
        getSelection: {
          response: ['selection']
        },
        createMatch: {
          type: 'post'
        }
      },
      props: ['selection', 'credit'],
      navs: ['shop', 'ranking'],
      subs: {
        matchResults: {
          actions: ['getUserMatches', 'acceptMatch', 'skipMatch'],
          props: ['matches', 'credit'],
          navs: ['conversation:', 'shop']
        }
      }
    },
    chat: {
      actions: ['getConversations'],
      props: ['conversations'],
      navs: ['conversation:'],
      subs: {
        conversation: {
          actions: ['getMessages'],
          props: ['messages', 'users'],
          navs: ['profile:']
        }
      }
    },
    ranking: {
      actions: ['getRanking'],
      props: ['ranking'],
      navs: ['profile:', 'shop']
    },
    home: {
      actions: {
        getUserInfo: {
          props: ['userId'],
          response: ['credit', 'matches', 'username']
        }
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
            },

          }
        },
        profile:{
          model: {
              username: 'string',
              password: 'password',
              email: 'email',
              jwt: 'string',
              pictureUrl: 'picture'
          },
          setEditable, // Will generate actions and actionStates
        },
        shop: {
          actions: ['getCredit', 'buyCreditSmall', 'buyCreditMedium', 'buySubscription'],
          props: ['credit']
        }
      }
    }
  }
}
