# AutoRnApp (Auto React Native App) - WIP
`AutoRnApp` is a well opinionated ignite boilerplate + generator which aims to save your precious time.

You need to make an App for a customer? Thanks to this generator, you are going to be the faster dev and your quote will be the lower, just because you didn't wasted time copy/pasting your containers/components/redux/sagas/etc....

Just focus on your business logic ! Writing crud APIs is nor clever nor a source of spiritual lifting !

AutoRnApp will generate for you CRUD and misc actions (signUp, signIn, etc...) in a "stacks in tabs" App (see [React Navigation](https://github.com/react-community/react-navigation)).
It will generate hoc, components, styles, redux, sagas and apis 100% automatically.

---
## Concepts
- A container is not necessarily a screen, AutoRnApp will create your screens in the `Screens` directory. They are meant to be displayed.
- It will generate a "stacks in tabs" app, it means that you will get 3 level of containers: tab, stack holder and stack items. Those `hoc` are stored into a `subs` attribute.
- You can create crud models just by setting a `model` attribute to your hoc. It will then create CRUD actions (get, post, put, delete to your API endpoints).
- You can dynamicaly override headers of your api and also api methods. You can of course edit your files.
- Nothing related to your design should be in containers, components are generated for this purpose. Props and actions are injected into them. Separation of concerns is good for your salute.
- I guarantee that CRUD will work as first level hoc (tabs), I don't guarantee it will work in stacks but it should !
- Currently only 3 levels are supported. It means that you have tabs with a main screen for each and then you can open as many modal stacks you want into them. Stack Navigation is kept between tabs. If it's not enough for you, open an issue or submit a PR.
- You define a prodHost and a devHost, they will be used for your APIs depending on `process.env.NODE_ENV`.
---
## Important notes
- **Be carefull** to not generate again the app ! Default behaviour for now is to overwrite everything ! See [this issue](https://github.com/infinitered/ignite/issues/1120).
- You cannot change the name nor the place of your config file. (open issue if needed)
- One rule is that **none** of your hocs can have same names. None means none, even in different levels. This is due to the fact I make a hocList once in the config. Not OK ? -> PR
- Linting of generated files is not good, this is due to some trailing commas and space which would make the templates code even uglier if I had to remove them. Please be indulgent, this plugin do already a lot for us !

---
## How to ?
- create a new project -> `ignite new MyAwesomeAutoApp -b AutoRnApp`
- Create the config file -> `App/Config/AutoApp.conf.js` ([exemple here](https://github.com/l1br3/ignite-AutoRnApp/blob/master/test/assets/AutoApp.conf.js))
- Run the generator -> `ignite generate app`
- add `transform-decorators-legacy` and `module-resolver` plugins to .babelrc
```json
{
  "plugins": ["transform-decorators-legacy",
    ["module-resolver", {
      "root": ["./App"],
      "alias": {
        "Redux": "./Redux",
        "Sagas": "./Sagas",
        "Screens": "./Screens",
        "Themes": "./Themes",
        "Components": "./Components",
        "Containers": "./Containers",
        "Services": "./Services",
        "Transforms": "./Transforms",
        "Lib": "./Lib",
        "Images": "./Images",
        "Icons": "Images/Icons",
        }}
    ]],
}
```

```js
// Exemple config file
module.exports = {
  rootUrl: {
    dev: 'http://localhost:1337', //1337 is for sails.js, have a look to this awesome project !
    prod: 'http://myprodhost.com'
  },
  subs: {
    user: {
      model: {  // Will generate CRUD actions (redux, sagas, api)
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
              isForm, // Component generation - not released
            },
            register: {
              navs: ['authenticate', 'recover'], // navigation actions
              props: ['username', 'email', 'password'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              isForm, // Component generation - not released
            },
            recover: {
              navs: ['authenticate', 'register'], //  navigation actions
              props: ['email'], // states used in form and submitted to the saga/redux action
              response: ['jwt'],
              isForm, // Component generation - not released
            },
          }
        }
      }
    }
  }
}

```
---
## Fork it if you want !
- Use gulp to transform the ConfBuilder to something understable by ignite CLI
- Put your config file in App/Config/AutoApp.conf.js - **use module.export and not export default, ignite CLI is not ready for that**

---
## TODO
- generate tests
- generate forms into components (need to fine tune and manage action dispatching)
- test CRUD into stacks
- make list of files to patch and patch them (should be done, make a review with full testing)
- add updateModel so we also can update model once instead of updating it prop by prop
- add props assign in components' render if hoc isCrud (done for all components I think ?)
- add onOpen to subs (what is it ?)
- don't create reducers for isForm actions (secondary as forms reducers won't overwrite original reducers)
