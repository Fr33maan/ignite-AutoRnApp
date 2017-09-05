/* eslint-disable */
// In EVAL we trust !

// Take a raw config in parameters and transform it to an array
export default function exportScreen (config) {
  config = config.replace(/([\w]+)/g, (x, y, z) => '\'' + y + '\'')
  config = config.trim()
  config = config.replace(/ /g, ',')
  config = config.replace(/]]/g, ']],')
  config = config.replace(/\n/g, '')
  config = '[' + config + ']'
  config = eval(config)
  return config
}
