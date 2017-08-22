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
          props: ['match'],
          type: 'post'
        }
      },
      props: ['selection', 'credit'],
      navs: ['shop', 'ranking'],
      subs: {
        matchResults: {
          actions: {
            getUserMatches: {
              args: ['userId'],
              response: ['matches']
            },
            acceptMatch: {
              args: ['matchId'],
              type: 'post'
            },
            skipMatch: {
              args: ['matchId'],
              type: 'post'
            }
          },
          props: ['matches', 'credit'],
          navs: ['conversation:', 'shop']
        }
      }
    },
    chat: {
      actions: {
        getConversations: {
          props: ['userId'],
          response: ['conversations']
        },
      },
      props: ['conversations'],
      navs: ['conversation:'],
      subs: {
        conversation: {
          actions: {
            getMessages: {
              props: ['conversationId'],
              response: ['messages']
            },
          },
          props: ['messages', 'users'],
          navs: ['profile:']
        }
      }
    },
    ranking: {
      actions: {
        getRanking: {
          response: ['ranking']
        },
      },
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
          actions: {
            isAuth: {
              props: ['jwt'],
              response: ['isAuth']
            },
            logOut: {},
          },
          props: ['isAuth'],
          subs: {
            authenticate: { // StackNavigator and imports
              navs: ['register', 'recover'], //  navigation actions
              props: ['email', 'password', 'jwt'], // states used in form and submitted to the saga/redux action // might be a dupe with model
              response: ['jwt'],
              type: 'post',
              setForm, // Component generation - not released
            },
            register: {
              navs: ['authenticate', 'recover'], // navigation actions
              props: ['username', 'email', 'password'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              type: 'post',
              setForm, // Component generation - not released
            },
            recover: {
              navs: ['authenticate', 'register'], //  navigation actions
              props: ['email'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              type: 'post',
              setForm, // Component generation - not released
            },
          }
        },
        user: {
          model: {
              username: 'string',
              password: 'password',
              email: 'email',
              jwt: 'string',
              pictureUrl: 'picture',
              userId: 'string'
          },
          setEditable, // Will generate actions and actionStates
        },
        shop: {
          actions: {
            getCredit: {
              response: ['credit']
            },
            buyCreditSmall: {},
            buyCreditMedium: {},
            buySubscription: {},
          },
          props: ['credit']
        }
      }
    }
  }
}
