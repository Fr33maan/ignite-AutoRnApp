// @cliDescription  Generate an entire app
// Generates a "app"

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite, filesystem } = context
  const configObject = require(`${process.cwd()}/App/Config/AutoApp.conf.js`)

  const ConfigBuilder = require('../dist/ConfBuilder').default
  const mainConfig = new ConfigBuilder(configObject)
  const FilePatcher = require('../dist/FilePatcher').default
  const patcher = new FilePatcher(context)

  // Each tab (level 0)
  for ( let tabName in mainConfig.config.subs ) {
    const tab = mainConfig.config.subs[tabName]
    patcher.pacthAppNavigationFile(tab.Name)
    patchReducersIfNecessary(tab)
    patchSagasIfNecessary(tab)
    patchNavReducerIfNecessary(tab)

    // Create files from templates and props
    for (let template of tab.templates) {
      await ignite.copyBatch(context, [template.job], template.props)
    }

    // Each modalHolder hoc (level 1)
    for ( let modalHolderHocName in tab.subs ) {
      const modalHolder = tab.subs[modalHolderHocName]
      patchReducersIfNecessary(modalHolder)
      patchSagasIfNecessary(modalHolder)
      patchNavReducerIfNecessary(modalHolder)

      // Create files from templates and props
      for (let template of modalHolder.templates) {
        await ignite.copyBatch(context, [template.job], template.props)
      }

      // Each stack item (level 2)
      for ( let modalName in modalHolder.subs ) {
        const modal = modalHolder.subs[modalName]
        patchReducersIfNecessary(modal)
        patchSagasIfNecessary(modal)
        patchNavReducerIfNecessary(modal)

        // Create files from templates and props
        for (let template of modal.templates) {
          await ignite.copyBatch(context, [template.job], template.props)
        }
      }
    }
  }
  
  /* CREATE Modals Reducers and Sagas START */
  await createModalsReducersAndSagas()
  async function createModalsReducersAndSagas () {

    // Create the modals reducer
    await ignite.copyBatch(context, [{
      template: `rdx.modals.ejs.js`,
      target:  `App/Redux/rdx.modals.js`
    }], {
      modals: mainConfig.modals,
      initialState: mainConfig.modalsInitialState
    })
    
    await ignite.copyBatch(context, [{
      template: `sga.modals.ejs.js`,
      target:  `App/Sagas/sga.modals.js`
    }], {
      modals: mainConfig.modals,
      initialState: mainConfig.modalsInitialState
    })
  }
  /* CREATE Modals Reducers and Sagas END */


  function patchReducersIfNecessary (hoc) {
    let formAction = false
    for (let action of hoc.actions) {
      if (action.isForm) {
        formAction = action
        break
      }
    }
    // If one of the action (or the only action) needs a form we patch reducers with form
    if (formAction) {
      patcher.patchReducersWithForm(formAction)
    }
    
    // Patch crud forms
    if (hoc.model && hoc.isEditable) {
      patcher.patchReducersWithModelForm(hoc)
    }

    // The hoc could also contains other actions or maybe doesn't have any form action so we import it as a whole reducer
    if ((hoc.actions.length > 0 || !formAction) && (hoc.level !== 1 || !hoc.excludeFromStack)) {
      patcher.patchReducers(hoc)
    }
  }

  function patchSagasIfNecessary (hoc) {
    if(hoc.actions.length > 0) {
      patcher.patchSagasIndex(hoc)
    }
  }
  
  function patchNavReducerIfNecessary (hoc) {
    if(hoc.level === 1 && (hoc.subsNames.length > 0 || !hoc.excludeFromStack)){
      patcher.patchNavReducer(hoc)
    }
  }
  
  return
}
