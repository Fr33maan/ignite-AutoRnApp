// @cliDescription  Generate an entire app
// Generates a "app"

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite, filesystem } = context
  const ConfigBuilder = require('../dist/ConfBuilder').default
  const configObject = require(`${process.cwd()}/App/Config/AutoApp.conf.js`)
  const config = new ConfigBuilder(configObject).config
  const patterns = require('../lib/patterns')

  // Each tab (level 0)
  for ( let tabName in config.subs ) {
    const tab = config.subs[tabName]
    pacthAppNavigationFile(tab.Name)

    // Create files from templates and props
    for (let template of tab.templates) {
      await ignite.copyBatch(context, [template.job], template.props)
    }

    // Each modalHolder hoc (level 1)
    for ( let modalHolderHocName in tab.subs ) {
      const modalHolder = tab.subs[modalHolderHocName]

      // Create files from templates and props
      for (let template of modalHolder.templates) {
        await ignite.copyBatch(context, [template.job], template.props)
      }

      // Each stack item (level 2)
      for ( let modalName in modalHolder.subs ) {
        const modal = modalHolder.subs[modalName]

        // Create files from templates and props
        for (let template of modal.templates) {
          await ignite.copyBatch(context, [template.job], template.props)
        }
      }
    }
  }


  // Patch files
  // Sagas/index.js
  // Redux/index.js

  // Patch Navigation/AppNavigation.js
  function pacthAppNavigationFile (tabName) {
    const appNavFilePath = `${process.cwd()}/App/Navigation/AppNavigation.js`
    const importToAdd = `import ${tabName} from '../Screens/${tabName}/${tabName}'`
    const routeToAdd = `  ${tabName}: { screen: ${tabName} },`

    if (!filesystem.exists(appNavFilePath)) {
      const msg = `No '${appNavFilePath}' file found.  Can't insert screen.`
      print.error(msg)
      process.exit(1)
    }

    // insert screen import
    ignite.patchInFile(appNavFilePath, {
      after: patterns[patterns.constants.PATTERN_IMPORTS],
      insert: importToAdd
    })

    // insert screen route
    ignite.patchInFile(appNavFilePath, {
      after: patterns[patterns.constants.PATTERN_ROUTES],
      insert: routeToAdd
    })
  }
  
  return
}
