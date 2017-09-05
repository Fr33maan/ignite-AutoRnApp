const isEditable = true
const isForm = true
const includeInStack = true

module.exports = {
  initialRoute : 'Home', // Capitalized sub name - used in AppNavigation
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
          props: ['user1', 'user2'],
          type: 'post',
          isForm,
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
          subs: {
            authenticate: { // StackNavigator and imports
              actions: {
                isAuth: {
                  props: ['jwt'],
                  response: ['isAuth']
                },
                logOut: {},
              },
              navs: ['Register', 'Recover'], //  navigation actions
              props: ['email', 'password', 'jwt'], // states used in form and submitted to the saga/redux action // might be a dupe with model
              response: ['jwt'],
              type: 'post',
              isForm,
            },
            register: {
              navs: ['Authenticate', 'Recover'], // navigation actions
              props: ['username', 'email', 'password'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              type: 'post',
              isForm,
            },
            recover: {
              navs: ['Authenticate', 'Register'], //  navigation actions
              props: ['email'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              type: 'post',
              isForm,
            },

          }
        },
        user: {
          includeInStack,
          model: {
              username: 'string',
              password: 'password',
              email: 'email',
              jwt: 'string',
              pictureUrl: 'picture'
          },
          isEditable,
        },
        shop: {
          includeInStack,
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
