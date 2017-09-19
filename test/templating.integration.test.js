
import fs from 'fs'
import ejs from 'ejs'
import R from 'ramda'
import ConfigBuilder from '../lib/ConfBuilder'
import AppConfig from './assets/AutoApp2.conf.js'


function getConfig (notConfigOnly) {
  const config = new ConfigBuilder(JSON.parse(JSON.stringify(AppConfig)))
  return notConfigOnly ? config : config.config
}
function debugConfig (config, depth=null) {
  console.dir(config, {depth})
}
function debugParse (parsed) {
  console.log(parsed)
}
// --------------------------
// -------- TAB HOC ---------
// -------- LEVEL 0 ---------
// --------------------------
test('test hoc render for top HOC (eg. home)', () => {
  const NewAppConfig = getConfig()
  debugConfig(NewAppConfig.subs.home, 3)
  const hoc          = NewAppConfig.subs.home
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.tab.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})
test('test hoc CMP render for top HOC (eg. home)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home
  // debugConfig(hoc, 3)
  const props        = hoc.templates[2].props
  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/cmp.tab.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

// --------------------------
// ------- MODAL HOC --------
// -------- LEVEL 1 ---------
// --------------------------
test('test hoc render for modal HOC without subs and with CRUD (eg. home/user)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.user  // debugConfig(hoc, 4)
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.modal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

test('test hoc render for modal HOC with subs (eg. home/auth)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth  // debugConfig(hoc, 4)
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.modal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

test('test hoc render for modal HOC without subs and with additional actions only (eg. home/shop)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.shop
  // debugConfig(hoc, 3)
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.modal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

test('test hoc CMP render for modal HOC (eg. Auth)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth
  // debugConfig(hoc, 3)
  const props        = hoc.templates[2].props
  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/cmp.modal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

// --------------------------
// ----- SUB MODAL HOC ------
// -------- LEVEL 2 ---------
// --------------------------
test('test hoc render for submodal HOC (eg. home/auth/authenticate)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth.subs.authenticate
  const props        = hoc.templates[0].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/hoc.submodal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})
test('test hoc CMP render for submodal HOC (eg. home/auth/authenticate)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth.subs.authenticate
  // debugConfig(hoc.templates, 3)
  const props        = hoc.templates[2].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/cmp.submodal.ejs.jsx', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})
// --------------------------
// --------- REDUX ----------
// --------------------------
// crud hoc
test('test redux render for crud actions (eg. user)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.user
  // console.log(hoc.templates)
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/rdx.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

// single action hoc from subs
test('test redux render for single action from subs (eg. authenticate)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth.subs.authenticate
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/rdx.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

// additional action hoc from actions
test('test redux render for additional action (eg. isAuth)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/rdx.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

// --------------------------
// --------- SAGAS ----------
// --------------------------
// crud hoc
test('test sagas render for crud actions (eg. user)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.user
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/sga.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

// single action hoc
test('test sagas render for single action (eg. authenticate)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth.subs.authenticate
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/sga.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  // debugParse(parsed)

  expect(true).toBe(true)
})

test('test sagas render for additional action (eg. isAuth)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/sga.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)

  expect(true).toBe(true)
})

test('test sagas render for additional action in topHoc (eg. getUserInfo)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/sga.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)

  expect(true).toBe(true)
})

// --------------------------
// ---------- API -----------
// --------------------------
// crud hoc
test('test api render for crud actions (eg. user)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.user
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/api.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)
  expect(true).toBe(true)
})

// single action hoc
test('test api render for single action (eg. authenticate)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home.subs.auth.subs.authenticate
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/api.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)

  expect(true).toBe(true)
})

test('test api render for additional action (eg. home)', () => {
  const NewAppConfig = getConfig()
  const hoc          = NewAppConfig.subs.home
  const props        = hoc.templates[4].props

  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/api.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props}, {debug: false})
  debugParse(parsed)

  expect(true).toBe(true)
})

// Modals reducer
test('test modals reducers render', () => {
  const NewAppConfig = getConfig(true)
  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/modalsReducer.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props: {modals: NewAppConfig.modals, initialState: NewAppConfig.modalsInitialState}}, {debug: false})
  debugParse(parsed)

  expect(true).toBe(true)
})

test('test modals sagas render', () => {
  const NewAppConfig = getConfig(true)
  const ejsTemplate  = fs.readFileSync(__dirname + '/../templates/modalsSagas.ejs.js', 'utf8')
  const parsed       = ejs.render(ejsTemplate, {props: {modals: NewAppConfig.modals, initialState: NewAppConfig.modalsInitialState}}, {debug: false})
  debugParse(parsed)

  expect(true).toBe(true)
})

test('Test templates generation', () => {
  const NewAppConfig = getConfig()
  const AuthenticateTemplates = NewAppConfig.subs.home.subs.auth.subs.authenticate.templates

  expect(AuthenticateTemplates.length).toBe(7)
  // Container template
  expect(AuthenticateTemplates[0].job.target).toBe('App/Screens/Home/Auth/Authenticate.js')

  // Container styles
  expect(AuthenticateTemplates[1].job.target).toBe('App/Screens/Home/Auth/_Styles/sty.Authenticate.js')

  // Component
  expect(AuthenticateTemplates[2].job.target).toBe('App/Screens/Home/Auth/_Components/cmp.Authenticate.js')

  // Component Style
  expect(AuthenticateTemplates[3].job.target).toBe('App/Screens/Home/Auth/_Components/_Styles/sty.cmp.Authenticate.js')

  // Redux
  expect(AuthenticateTemplates[4].job.target).toBe('App/Redux/Home/Auth/rdx.Authenticate.js')

  // Saga
  expect(AuthenticateTemplates[5].job.target).toBe('App/Sagas/Home/Auth/sga.Authenticate.js')

  // Api
  expect(AuthenticateTemplates[6].job.target).toBe('App/Services/API/api.Authenticate.js')
})
