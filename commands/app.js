// @cliDescription  Generate an entire app
// Generates a "app"

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite, filesystem } = context
  const ConfigBuilder = require('../dist/ConfBuilder').default
  const configObject = require('App/Config/AutoApp.conf.js')
  const config = new ConfigBuilder(configObject)

  for ( let tabName in config.subs ) {
    const tab = config.subs[tabName]
    for (let template of tab.templates) {
      await ignite.copyBatch(context, [template.job], template.props)
    }
    for ( let modalHolderHocName in tab.subs ) {
      const modalHolder = tab.subs[modalHolderHocName]
      for (let template of modalHolder.templates) {
        await ignite.copyBatch(context, [template.job], template.props)
      }

      for ( let modalName in modalHolder.subs ) {
        const modal = modalHolder.subs[modalName]
        for (let template of modal.templates) {
          await ignite.copyBatch(context, [template.job], template.props)
        }
      }
    }
  }

  // Copies the `testcmd.js.ejs` in your plugin's templates folder
  // into App/testcmds/${name}.js.
  // const jobs = [{
  //   template: 'testcmd.ejs.js',
  //   target: `App/Testcmds/${name}.js`
  // }]

  // make the templates and pass in props with the third argument here
  // await ignite.copyBatch(context, jobs, props)

  return
}
