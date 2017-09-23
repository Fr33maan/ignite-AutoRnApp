import R from 'ramda'
import _ from 'lodash'

// ---------------------
// Some helper functions

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function camelToSnake (string) {
  return string.replace(/\.?([A-Z]+)/g, function (x, y) { return '_' + y.toLowerCase() }).replace(/^_/, '')
}
function objectToArray (obj, fn) {
  let arr = []
  _.each(obj, (prop, propName) => {
    let result = fn(prop, propName)
    arr.push(result)
  })
  return arr
}


// ---------------------
// The main class, we pass the config object into parameters
export default class ConfigBuilder {

  constructor(config) {
    // Clone the object if we need to access or display it in the future
    this.preConfig = JSON.parse(JSON.stringify(config))
    this.config = config
    this.modals = []
    this.modalsInitialState = null
    
    this.buildConfig()
  }

  buildConfig () {
    // Store this in higher scope because this represent the function itself in the genrator scope
    const confBuilder = this

    // -------------------------------
    // -------- PROCESS STEPS --------
    // Each hoc config will be flavoured with many props
    // This is to avoiding computing anything in command and templates

    // this function will return a generator so every step is processed in order for each hoc/subhoc
    const process = (hoc, hocName, level, pathModifier) => (function * () {
      const debug = false
      yield confBuilder.setRCompAttributes(hoc, hocName, level, pathModifier)
      yield confBuilder.createFileJobs(hoc)
      yield confBuilder.createReduxStates(hoc)
      yield confBuilder.createReduxActions(hoc)
      yield confBuilder.configureNavs(hoc)
      yield confBuilder.createTemplateProps(hoc)
      yield confBuilder.createModals(hoc)
    })()

    // Build generators and store them
    // This is why every single sub MUST have an unique name
    // Add a prefix if needed
    let generators = {}
    for (let tabName in this.config.subs) {
      const topHoc = this.config.subs[tabName]
      generators[tabName] = process(topHoc, tabName, 0, capitalize(tabName))

      for (let modalName in topHoc.subs) {
        const modal = topHoc.subs[modalName]
        generators[modalName] = process(modal, modalName, 1, `${capitalize(tabName)}/${capitalize(modalName)}`)

        for (let hocName in modal.subs) {
          const hoc = modal.subs[hocName]
          generators[hocName] = process(hoc, hocName, 2, `${capitalize(tabName)}/${capitalize(modalName)}`)
        }
      }
    }

    // Run generators
    let running = true
    while(running){
      _.each(generators, generator => {
        const next = generator.next()
        running = !next.done
      })
    }
    
    // Set modals initial state
    this.modalsInitialState = JSON.stringify(R.mergeAll(this.modals.map(modal => ({[`show${modal.Name}Modal`]: false}))), null, '\t')
  }

  // Set some misc attributes used in all next steps
  setRCompAttributes (hoc, hocName, level, pathModifier) {
    hoc.level = level
    hoc.name = hocName
    hoc.Name = capitalize(hocName)
    hoc.NAME = hocName.toUpperCase(),
    hoc.screenRootDir = `Screens/${pathModifier}`
    hoc.reduxRootDir = `Redux/${pathModifier}`
    hoc.sagaRootDir = `Sagas/${pathModifier}`
    hoc.apiRootDir = `Services/API`
    hoc.ScreenName = hoc.Name + 'Screen'
    hoc.componentRootDir = hoc.screenRootDir + (hoc.level !== 0 ? '/_Components' : '')
    hoc.stylesRootDir = hoc.screenRootDir    + (hoc.level !== 0 ? '/_Styles' : '')
    hoc.crud = hoc.model ? true : false
    hoc.response = hoc.response || []
    hoc.subsNames = objectToArray(hoc.subs, (sub, subName) => ({
      name: subName,
      Name: capitalize(subName),
      NAME: camelToSnake(subName).toUpperCase()
    }))
  }

  createFileJobs (hoc) {
    let hocType
    switch (hoc.level) {
      case 0:
      hocType = 'tab'
      break

      case 1:
      hocType = 'modal'
      break

      case 2:
      hocType = 'submodal'
      break
    }
    
    const forcedType = hoc.level === 1 && hoc.includeInStack ? 'submodal' : hocType

    hoc.templates = [{
      template: `hoc.${hocType}.ejs.jsx`,
      target:  `App/${hoc.screenRootDir}/${hoc.Name}.js`
    },{
      template: `sty.hoc.ejs.js`,
      target:  `App/${hoc.stylesRootDir}/sty.${hoc.Name}.js`
    },{
      template: `cmp.${forcedType}.ejs.jsx`,
      target:  `App/${hoc.componentRootDir}/cmp.${hoc.Name}.js`
    },{
      template: `sty.cmp.ejs.js`,
      target:  `App/${hoc.componentRootDir}/${hoc.level !== 0 ? '_Styles' : ''}/sty.cmp.${hoc.Name}.js`
    }]
    .concat((() => {
      if(hoc.level !== 1 || 'actions' in hoc || 'model' in hoc){ // Most level 1 hocs are just modal holder and does not need redux / saga / API
        return [{
          template: `rdx.ejs.js`,
          target:  `App/${hoc.reduxRootDir}/rdx.${hoc.Name}.js`
        },{
          template: `sga.ejs.js`,
          target:  `App/${hoc.sagaRootDir}/sga.${hoc.Name}.js`
        },{
          template: `api.ejs.js`,
          target:  `App/${hoc.apiRootDir}/api.${hoc.Name}.js`
        }]
      } else {
        return []
      }
    })())
    .map(job => ({job, props: {}})) // Return each job in a container (we need to store props on same level than job) - do this at the end for code readability
  }

  createReduxStates (hoc,) {
    let states = []

    // We know if a hoc needs crud actions if it has a 'model' property
    if ('model' in hoc) {
      // Add each prop state + doing/done
      const props = R.unnest(objectToArray(hoc.model, (prop, propName) => propName))
      states = states.concat(props)
      states = states.concat([`doingGet${hoc.Name}`     , `doneGet${hoc.Name}`])
      states = states.concat([`doingCreate${hoc.Name}`  , `doneCreate${hoc.Name}`])
      states = states.concat([`doingDestroy${hoc.Name}` , `doneDestroy${hoc.Name}`])
      // Create an update state for every prop (updateUsername, updatePassword, etc...)
      states = states.concat(R.unnest(props.map(prop => [`doingUpdate${hoc.Name}${capitalize(prop)}` , `doneUpdate${hoc.Name}${capitalize(prop)}`])))

      // Modal holder hoc which need every sub hoc
      // The modal holder will have every subHoc action states (doingLogin, doingLogOut, etc...)
      // Only level 1 contains final actions
    } else if (('subs' in hoc) && hoc.level === 1) {
      states = R.unnest(objectToArray(hoc.subs, (subHoc, subHocName) => [`doing${capitalize(subHocName)}`, `done${capitalize(subHocName)}`, `error${capitalize(subHocName)}`]))

      // Final hoc which needs his own action + props
    } else if (hoc.level === 2){
      // Add doing/done states + props to state
      states = [`doing${hoc.Name}`, `done${hoc.Name}`, `error${hoc.Name}`]
    }

    // If additional actions (no screen generated) are given we add them to states and initial state
    if ('actions' in hoc) {
      states = states.concat(R.unnest(objectToArray(hoc.actions, (action, actionName) => [`doing${capitalize(actionName)}`, `done${capitalize(actionName)}`, `error${capitalize(actionName)}`])))
      objectToArray(hoc.actions, (action, actionName) => action).map(action => {
        if('response' in action) {
          states = states.concat(action.response)
        }
      })
    }

    // Add hoc response props to state
    if ('response' in hoc) {
      states = states.concat(hoc.response)
    }

    // Store states
    hoc.states = states

    // We add showModal states for tab hocs as they contains modals stack
    // if(hoc.level === 0){
    //   const subNames = objectToArray(hoc.subs, (sub, subName) => subName) //Array of sub hocs
    //   hoc.states = hoc.states.concat(subNames.map(subName => `show${capitalize(subName)}Modal`))
    // }

    // Build the initialState for every hoc, set all states to null
    hoc.initialState = JSON.stringify(R.mergeAll(hoc.states.map(state => ({[state]: state.match(/doing|done/) ? false : null}))), null, '\t')
  }

  createReduxActions (hoc, level) {
    let actions = []

    // We know if a hoc needs crud actions if it has a 'model' property
    if('model' in hoc){
      const props = R.unnest(objectToArray(hoc.model, (prop, propName) => propName))
      actions.push({
        name: `get${hoc.Name}`,
        args: ['id'],
        res: props
      })
      actions.push({
        name: `create${hoc.Name}`,
        args: props,
        res: []
      })
      actions.push({
        name: `delete${hoc.Name}`,
        args: ['id'],
        res: []
      })
      props.map(prop => {
        // For update we create action for every single prop so we can update props separately
        actions.push({
          name: `update${hoc.Name}${capitalize(prop)}`,
          args: [prop],
          res: [prop]
        })
      })

    // This is a single action Hoc and his action is his name
    // We might not want to set it as an action (not create redux / sagas)
    // if level is 1 and we don't want to include it in stack
  } else if(hoc.level === 2) {
      actions = [{
        name: hoc.name,
        args: hoc.props || [],
        res: hoc.response || [],
        type: hoc.type || 'get',
        isForm: hoc.isForm
      }]
    }

    // Add existing actions to hoc
    if ('actions' in hoc) {
      // Actions are stored as objects and we need them as arrays
      const singleActions = objectToArray(hoc.actions, (action, actionName) => ({
        ...action,
        name: actionName,
        args: action.props || [],
        res: action.response || [],
      }))

      actions = [...actions, ...singleActions.map(action => ({
        ...action,
        Name: capitalize(action.name),
        NAME: camelToSnake(action.name).toUpperCase()
      }))]
    }

    // Add misc attributes needed in templates to all actions
    hoc.actions = actions.map(action => ({
      ...action,
      Name: capitalize(action.name),
      NAME: camelToSnake(action.name).toUpperCase()
    }))
  }

  createTemplateProps (hoc) {
    for (let template of hoc.templates) {
      const jobType = template.job.template.match(/(^\w*)\./)[1]

      const isStackComponentStyle = ( template.job.template.match('sty') && hoc.level !== 0 )
      template.props = isStackComponentStyle ? {...template.props, isStackComponentStyle: true} : template.props

      this.createTemplateMiscProps(hoc, template.props, jobType)
      this.createTemplateImports(hoc, template.props, jobType)
    }
  }


  // This is NOT called by the process but by the createTemplateProps function
  // This ugly function will generate all imports props necessaries for template generation
  // Only for containers and components
  createTemplateImports (hoc, props, jobType) {
    hoc.subHocsList = objectToArray(hoc.subs, subHoc => subHoc.Name)
    if(jobType === 'hoc') {
      // This vomit function will import ./Auth/auth from User (topHoc / level 0) or ./Authenticate from Auth (level 1)
      props.imports = hoc.subHocsList.map(subHoc => hoc.level === 0 ? `import ${subHoc} from './${subHoc}/${subHoc}'` : `import ${subHoc} from './${subHoc}'`.trim())
      .concat([`import styles from './${hoc.level !== 0 ? '_Styles/' : ''}sty.${hoc.Name}'`])
      .concat([`import ${hoc.Name}Component from './${hoc.level !== 0 ? '_Components/' : ''}cmp.${hoc.Name}'`])

      // Add redux actions imports
      .concat((() => {
          if(hoc.level != 1 || hoc.actions.length > 0) {
            return [`import ${hoc.name}Actions from '${hoc.reduxRootDir}/rdx.${hoc.Name}'`]

          } else {
            return [] // Return an empty array which will be merged and will disappear
          }
      })())

    } else if (jobType === 'cmp') {
      props.imports = [`import styles from './${hoc.level !== 0 ? '_Styles/' : ''}sty.cmp.${hoc.Name}'`]
    }
  }
  
  createModals (hoc) {
    if(hoc.level === 0 && hoc.subsNames.length > 0){
      this.modals = this.modals.concat(hoc.subsNames)
    }
  }
  
  // Will transform parametrized navs with in objects
  configureNavs (hoc) {
    if ('navs' in hoc) {
      hoc.navs = hoc.navs.map(nav => {
        let name = nav
        let param = null
        if(new RegExp(/:/).test(nav)){
          name = nav.split(':')[0]
          param = nav.split(':')[1]
        }
        
        return { name, param }
      })
    }
  }

  // This is NOT called by the process but by the createTemplateProps function
  // Yes, we could have just send the hoc to the template...
  createTemplateMiscProps (hoc, props) {
    props.name          = hoc.name,
    props.Name          = hoc.Name,
    props.NAME          = hoc.name.toUpperCase(),
    props.initialState  = hoc.initialState
    props.actions       = hoc.actions
    props.ComponentName = hoc.Name
    props.states        = hoc.states
    props.subsNames     = hoc.subsNames
    props.devUrl        = this.config.rootUrl.dev
    props.prodUrl       = this.config.rootUrl.prod
    props.isCrud        = 'model' in hoc
    props.isForm        = hoc.setForm
    props.navs          = hoc.navs
    props.includeInStack= hoc.includeInStack
    props.reduxRootDir  = hoc.reduxRootDir
    props.dirname       = __dirname //__dirname is inaccessible in EJS templates so we set it in props
    props.level         = hoc.level
  }
}
