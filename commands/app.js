// @cliDescription  Generate an entire app
// Generates a "app"

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite, filesystem } = context
  const configObject = require(`${process.cwd()}/App/Config/AutoApp.conf.js`)

  const ConfigBuilder = require('../dist/ConfBuilder').default
  const config = new ConfigBuilder(configObject).config
  const FilePatcher = require('../dist/FilePatcher').default
  const patcher = new FilePatcher(context)

  // Each tab (level 0)
  for ( let tabName in config.subs ) {
    const tab = config.subs[tabName]
    patcher.pacthAppNavigationFile(tab.Name)
    patchReducersIfNecessary(tab)

    // Create files from templates and props
    for (let template of tab.templates) {
      await ignite.copyBatch(context, [template.job], template.props)
    }

    // Each modalHolder hoc (level 1)
    for ( let modalHolderHocName in tab.subs ) {
      const modalHolder = tab.subs[modalHolderHocName]
      patchReducersIfNecessary(modalHolder)

      // Create files from templates and props
      for (let template of modalHolder.templates) {
        await ignite.copyBatch(context, [template.job], template.props)
      }

      // Each stack item (level 2)
      for ( let modalName in modalHolder.subs ) {
        const modal = modalHolder.subs[modalName]
        patchReducersIfNecessary(modal)

        // Create files from templates and props
        for (let template of modal.templates) {
          await ignite.copyBatch(context, [template.job], template.props)
        }
      }
    }
  }

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

    // The hoc could also contains other actions or maybe doesn't have any form action so we import it as a whole reducer
    if ((hoc.actions.length > 1 || !formAction) && (hoc.level !== 1 && !hoc.includeInStack)) {
      patcher.patchReducers(hoc)
    }
  }


  // Patch files
  // Sagas/index.js

  return
}
