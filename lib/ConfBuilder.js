import R from 'ramda'
import _ from 'lodash'

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

export default class ConfigBuilder {

  constructor(config) {
    this.preConfig = {...config}
    // Clone the object
    this.config = JSON.parse(JSON.stringify(config))
    this.subs = this.config.subs

    this.buildConfig()
  }

  buildConfig () {
    const confBuilder = this
    // -------------------------------
    // -------- PROCESS STEPS --------
    // Each hoc config will be flavoured with many props
    // This is to avoiding computing anything in command and templates

    const process = (hoc, hocName, level, pathModifier) => (function * () {
      const debug = false
      yield confBuilder.setRCompAttributes(hoc, hocName, level, pathModifier)
      yield confBuilder.createFileJobs(hoc)
      yield confBuilder.createReduxStates(hoc)
      yield confBuilder.createReduxActions(hoc)
      yield confBuilder.createTemplateProps(hoc)
      // yield confBuilder.createTemplateProps(hoc)
      // yield confBuilder.buildNavs(hoc, level)
    })()

    // Build generators
    let generators = {}
    for (let tabName in this.subs) {
      const topHoc = this.subs[tabName]
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

    // Run them
    let running = true
    while(running){
      _.each(generators, generator => {
        const next = generator.next()
        running = !next.done
      })
    }
  }

  //*** PRIVATE
  setRCompAttributes (hoc, hocName, level, pathModifier) {
    hoc.level = level
    hoc.name = hocName
    hoc.Name = capitalize(hocName)
    hoc.NAME = hocName.toUpperCase(),
    hoc.screenRootDir = `App/Screens/${pathModifier}`
    hoc.reduxRootDir = `App/Redux/${pathModifier}`
    hoc.sagaRootDir = `App/Sagas/${pathModifier}`
    hoc.apiRootDir = `App/Services/API`
    hoc.ScreenName = hoc.Name + 'Screen'
    hoc.componentRootDir = hoc.screenRootDir +'/_Components'
    hoc.stylesRootDir = hoc.screenRootDir +'/_Styles'
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

    hoc.templates = [{
      template: `hoc.${hocType}.ejs.jsx`,
      target:  `${hoc.screenRootDir}/${hoc.Name}.js`
    },{
      template: `sty.hoc.ejs.js`,
      target:  `${hoc.stylesRootDir}/sty.${hoc.Name}.js`
    },{
      template: `cmp.ejs.jsx`,
      target:  `${hoc.componentRootDir}/cmp.${hoc.Name}.js`
    },{
      template: `sty.cmp.ejs.js`,
      target:  `${hoc.componentRootDir}/_Styles/sty.cmp.${hoc.Name}.js`
    }]
    .concat((() => {
      if(hoc.level !== 1){
        return [{
          template: `rdx.ejs.js`,
          target:  `${hoc.reduxRootDir}/rdx.${hoc.Name}.js`
        },{
          template: `sga.ejs.js`,
          target:  `${hoc.sagaRootDir}/sga.${hoc.Name}.js`
        },{
          template: `api.ejs.js`,
          target:  `${hoc.apiRootDir}/api.${hoc.Name}.js`
        }]
      } else {
        return []
      }
    })())
    .map(job => ({job, props: {}}))
    // Return each job in a container (we need to store props on same level than job)
  }

  createReduxStates (hoc,) {
    // ------------------
    // --- DEFINITION ---
    // ------------------
    let states = []

    // Crud hoc which needs everything
    if ('model' in hoc) {
      const props = R.unnest(objectToArray(hoc.model, (prop, propName) => propName))
      states = states.concat(props)
      states = states.concat([`doingGet${hoc.Name}`     , `doneGet${hoc.Name}`])
      states = states.concat([`doingCreate${hoc.Name}`  , `doneCreate${hoc.Name}`])
      states = states.concat([`doingDestroy${hoc.Name}` , `doneDestroy${hoc.Name}`])
      states = states.concat(R.unnest(props.map(prop => [`doingUpdate${hoc.Name}${capitalize(prop)}` , `doneUpdate${hoc.Name}${capitalize(prop)}`])))

    // Modal holder hoc which need every sub hoc
    } else if ('subs' in hoc) {
      states = objectToArray(hoc.subs, (subHoc, subHocName) => [`doing${capitalize(subHocName)}`, `done${capitalize(subHocName)}`])

    // Final hoc which needs only his own action
    } else {
      states = [`doing${hoc.Name}`, `done${hoc.Name}`].concat(hoc.props)
    }

    hoc.states = states

    // We add showModal states
    if(hoc.level === 0){
      const subNames = objectToArray(hoc.subs, (sub, subName) => subName)
      hoc.states = hoc.states.concat(subNames.map(subName => `show${capitalize(subName)}Modal`))
    }

    hoc.initialState = JSON.stringify(R.mergeAll(hoc.states.map(state => ({[state]: false}))), null, '\t')
  }

  createReduxActions (hoc, level) {
    // ------------------
    // --- DEFINITION ---
    // ------------------
    let actions = []

    // Hoc is a crud model
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
        actions.push({
          name: `update${hoc.Name}${capitalize(prop)}`,
          args: [prop],
          res: [prop]
        })
      })

    // This is a final Hoc and his action is his name
    } else {
      actions = [{
        name: hoc.name,
        args: hoc.props || [],
        res: hoc.response || []
      }]
    }

    // Add Name to all actions
    hoc.actions = actions.map(action => ({
      ...action,
      Name: capitalize(action.name),
      NAME: camelToSnake(action.name).toUpperCase(),
    }))
  }


  createTemplateProps (hoc) {
    for (let template of hoc.templates) {
      const jobType = template.job.template.match(/(^\w*)\./)[1]
      this.createTemplateMiscProps(hoc, template.props, jobType)
      this.createTemplateImports(hoc, template.props, jobType)
    }
  }

  // This ugly function will generate all imports props necessaries for template generation
  // Only for containers and components
  createTemplateImports (hoc, props, jobType) {
    hoc.subHocsList = objectToArray(hoc.subs, subHoc => subHoc.Name)
    if(jobType === 'hoc') {
      props.imports = hoc.subHocsList.map(subHoc => `import ${subHoc} from './${subHoc}'`.trim())
      .concat([`import styles from './_Styles/sty.${hoc.Name}'`])
      .concat([`import ${hoc.Name}Component from './_Components/cmp.${hoc.Name}'`])

      // Add redux actions imports
      .concat((() => {
          if(hoc.level === 0) {
            return [`import * AS ${hoc.name}Actions from '${hoc.reduxRootDir}/rdx.${hoc.Name}'`]
          } else if(hoc.level === 2) {
            return [`import { ${hoc.name}Request } from '${hoc.reduxRootDir}/rdx.${hoc.Name}'`]
          } else {
            return [] // Return an empty array which will be merged and will disappear
          }
      })())

    } else if (jobType === 'cmp') {
      props.imports = [`import styles from './_Styles/sty.cmp.${hoc.Name}'`]
    }
  }


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
  }
}
