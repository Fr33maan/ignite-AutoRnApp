import patterns from './patterns'
import R from 'ramda'

export default class FilePatcher {

  constructor (context) {
    const { parameters, strings, print, ignite, filesystem } = context
    this.ignite = ignite
    this.filesystem = filesystem
  }

  pacthAppNavigationFile (tabName) {
    const appNavFilePath = `${process.cwd()}/App/Navigation/AppNavigation.js`
    const importToAdd = `import ${tabName} from 'Screens/${tabName}/${tabName}'`
    const routeToAdd = `  ${tabName}: { screen: ${tabName} },`

    if (!this.filesystem.exists(appNavFilePath)) {
      const msg = `No '${appNavFilePath}' file found.  Can't insert screen.`
      print.error(msg)
      process.exit(1)
    }

    // insert screen import
    this.ignite.patchInFile(appNavFilePath, {
      after: patterns.appNavImports,
      insert: importToAdd
    })

    // insert screen route
    this.ignite.patchInFile(appNavFilePath, {
      after: patterns.appNavRoutes,
      insert: routeToAdd
    })
  }

  patchReducers (hoc) {
    const reduxIndexFile = `${process.cwd()}/App/Redux/index.js`
    const importToAdd = `import * as ${hoc.Name}Reducer from '${hoc.reduxRootDir}/rdx.${hoc.Name}'`

    // insert reducer import
    this.ignite.patchInFile(reduxIndexFile, {
      after: patterns.reducersImports,
      insert: importToAdd
    })

    // insert screen import
    this.ignite.patchInFile(reduxIndexFile, {
      after: patterns.reducers,
      insert: `\t\t${hoc.name}: ${hoc.Name}Reducer.reducer,`
    })
  }

  patchReducersWithForm (formAction) {
    const reduxIndexFile = `${process.cwd()}/App/Redux/index.js`
    const { args, name } = formAction
    const propsObj = R.mergeAll(args.map(arg => ({[arg]: ''})))

    // The reducer is formatted to be linted, corretly indented thats because so much tabs
    // JSON.stringify does not indent closing bracket so the need of the replace
    const reducer = `\t\t\t${name}Form: ${JSON.stringify(propsObj, null, '\t\t\t\t')}`.replace(/.$/,'\t\t\t}') +','

    this.ignite.patchInFile(reduxIndexFile, {
      after: patterns.formsReducers,
      insert: reducer
    })
  }
  
  patchReducersWithModelForm (hoc) {
    const reduxIndexFile = `${process.cwd()}/App/Redux/index.js`
    const model = R.map(obj => obj.defaultValue, hoc.model)
        
    // The reducer is formatted to be linted, corretly indented thats because so much tabs
    // JSON.stringify does not indent closing bracket so the need of the replace
    const reducer = `\t\t\t${hoc.name}Form: ${JSON.stringify(model, null, '\t\t\t\t')}`.replace(/.$/,'\t\t\t}') +','
    
    this.ignite.patchInFile(reduxIndexFile, {
      after: patterns.formsReducers,
      insert: reducer
    })
  }
  
  patchSagasIndex (hoc) {
    const sagasIndexFile = `${process.cwd()}/App/Sagas/index.js`
    const { args, name, Name } = hoc

    const sagaImport = `import ${hoc.Name}Sagas from '${hoc.sagaRootDir}/sga.${hoc.Name}'`
    const sagasSpread = `\t\t...${hoc.Name}Sagas,`

    this.ignite.patchInFile(sagasIndexFile, {
      after: patterns.sagasImports,
      insert: sagaImport
    })

    this.ignite.patchInFile(sagasIndexFile, {
      after: patterns.sagasEffects,
      insert: sagasSpread
    })
  }
  
  patchNavReducer (hoc) {
    const sagasIndexFile = `${process.cwd()}/App/Redux/rdx.navigation.js`
    const { args, name, Name } = hoc
    
    const stackImport = `import ${hoc.Name}Container from '${hoc.screenRootDir}/${hoc.Name}'`
    const navReducer  = `\t${name}Nav: (state, action) => {
    return ${Name}Container.router.getStateForAction(action, state)
  },`

    this.ignite.patchInFile(sagasIndexFile, {
      after: patterns.navReducerImport,
      insert: stackImport
    })
    
    this.ignite.patchInFile(sagasIndexFile, {
      after: patterns.navReducer,
      insert: navReducer
    })
  }
}
