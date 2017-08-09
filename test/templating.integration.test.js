
import fs from 'fs'
import ejs from 'ejs'
import R from 'ramda'
import ConfigBuilder from '../lib/ConfBuilder'
import AppConfig from './assets/AppConfig.js'

// --------------------------
// -------- TAB HOC ---------
// --------------------------
test('test hoc render for crud top HOC (eg. user)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.tab.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)
  expect(true).toBe(true)
})
test('test hoc component render for crud top HOC (eg. user)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user
  const props        = hoc.templates[2].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/cmp.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)
  expect(true).toBe(true)
})

// --------------------------
// ------- MODAL HOC --------
// --------------------------
test('test hoc render for modal HOC (eg. auth)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user.subs.auth
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.modal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)
  expect(true).toBe(true)
})

// --------------------------
// ----- SUB MODAL HOC ------
// --------------------------
test('test hoc render for submodal HOC (eg. authenticate)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user.subs.auth.subs.authenticate
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.submodal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)
  expect(true).toBe(true)
})

// --------------------------
// --------- REDUX ----------
// --------------------------
// crud hoc
test('test redux render for crud actions (eg. user)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/redux.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)
  expect(true).toBe(true)
})

// single action hoc
test('test redux render for single action (eg. authenticate)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user.subs.auth
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/redux.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)
  expect(true).toBe(true)
})

// --------------------------
// --------- SAGAS ----------
// --------------------------
// crud hoc
test('test redux render for crud actions (eg. user)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/saga.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)
  expect(true).toBe(true)
})

// single action hoc
test('test redux render for single action (eg. authenticate)', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const hoc          = NewAppConfig.subs.user.subs.auth.subs.authenticate
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/saga.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, props, {debug: false})
  // console.log(parsed)

  expect(true).toBe(true)
})


test('Test templates generation', () => {
  const NewAppConfig = new ConfigBuilder(AppConfig)
  const AuthenticateTemplates = NewAppConfig.subs.user.subs.auth.subs.authenticate.templates

  expect(AuthenticateTemplates.length).toBe(7)
  // Container template
  expect(AuthenticateTemplates[0].job.target).toBe('App/Screens/User/Auth/Authenticate.js')

  // Container styles
  expect(AuthenticateTemplates[1].job.target).toBe('App/Screens/User/Auth/_Styles/sty.Authenticate.js')

  // Component
  expect(AuthenticateTemplates[2].job.target).toBe('App/Screens/User/Auth/_Components/cmp.Authenticate.js')

  // Component Style
  expect(AuthenticateTemplates[3].job.target).toBe('App/Screens/User/Auth/_Components/_Styles/sty.cmp.Authenticate.js')

  // Redux
  expect(AuthenticateTemplates[4].job.target).toBe('App/Redux/User/Auth/rdx.Authenticate.js')

  // Saga
  expect(AuthenticateTemplates[5].job.target).toBe('App/Sagas/User/Auth/sga.Authenticate.js')

  // Api
  expect(AuthenticateTemplates[6].job.target).toBe('App/Services/Auth/api.Authenticate.js')
})
