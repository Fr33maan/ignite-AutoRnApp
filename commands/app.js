// @cliDescription  Generate an entire app
// Generates a "app"

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const ConfigBuilder = require('../dist/ConfBuilder').default
  const configObject = require('App/Config/AutoApp.conf.js')
  const config = new ConfigBuilder(configObject)

  const createTemplates = template => {
    console.log(template.job)
    console.log(template.props)
    console.log('-------------')
    // await ignite.copyBatch(context, [template.job], template.props)
  }

  for ( let tabName in config.subs ) {
    const tab = config.subs[tabName]
    // console.log(tab.templates)
    tab.templates.map(createTemplates)

    for ( let tatopHocName in tab.subs ) {
      const topHoc = tab.subs[tatopHocName]
      // console.log(topHoc.templates)
      topHoc.templates.map(createTemplates)

      for ( let hocName in topHoc.subs ) {
        const hoc = topHoc.subs[hocName]
        // console.log(hoc.templates)
        hoc.templates.map(createTemplates)
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
