const setTab = true
const setStack = true
const setEditable = true
const setForm = true

export default {

  /*
  ## What it does ?
  Patch AppNavigation
  Generate
    main HOCs aka TOPHOCs (first level tab navigation)
    sub HOCs (second level stack nav through modals)
    HOCs uses actions and receive props which are linked to sagas and redux
    Each get a Component, props are injected to and actions can be triggered from them too
    Styles are linked to each React.Component (HOC & Components)

  ## How it does ?
  Each bloc represent one screen (or maybe an action too ? No, actions should be defined in screens as an action must be called. What for about dupes ?)
  Each action will receive is own props stored in the state profile.username != logIn.username
  Actions in generated in containers
  Navigation are generated too
  API calls are filled with action props
  API responses are filtered to reducers
  A main component is created and container props are linked to it

  ## What does it need ?
  topHOCs list:
    - mkdir Screens/topHOCname dir
    - generate each topHOC file jsx + styles    /    redux + sagas
    - patch the stack in AppNavigation

  HOCs list:
    - generate

  List of topHOCs -> create each screen and style
    import

  List of HOCs by topHOC

  import topHOCs in AppNavigation
  build NavStack

  list of
  import HOCs in

  Pretty Models generator

  // How to
  config is parsed at first level, create every TOPHOC
  Then each second level is parsed and HOC are created
  Finaly comes the Components generation, all the code
  */

  /*
  Currently only 3 levels are supported
  It means that you will have mains tabs and several stacks inside

  All hocs must have different names, even in different levels
  */

  models: {
    auth: {
      signUp: {
        args: ['username', 'password', 'email'],
        res: ['jwt']
      },
      logIn: {
        args: ['password', 'email', 'jwt'],
        res: ['jwt']
      },
      recover: {
        args: ['email'],
      },
      logOut: {
        args: ['jwt']
      },
      refreshToken: {
        args: ['jwt'],
        res: ['jwt']
      }
    },
    user: {
      crud: true
    }
  },

  rootUrl: {
    dev: 'http://localhost:1337',
    prod: 'http://myprodhost.com'
  },
  subs : {
    user: {
      model: {
          username: 'string',
          password: 'password',
          email: 'email',
          jwt: 'string',
          pictureUrl: 'picture'
      },
      setEditable, // Will generate actions and actionStates
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
        }
      }
    }
  },



  app: {
    profile: true,

    chat: {

    }
  },
  config: {},

  // staging params
  actions:{},
  states:{},
}
