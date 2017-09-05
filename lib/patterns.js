export default {
  // AppNav
  appNavImports   : `import[\\s\\S]*from\\s+'react-navigation';?`,
  appNavRoutes    : 'const PrimaryNav',

  // Reducers
  reducersImports : 'AutoRnApp patches imports here',
  reducers        : 'AutoRnApp reducers',
  formsReducers   : 'AutoRnApp forms reducers',

  // Sagas
  sagasImports    : 'AutoRnApp sagas imports',
  sagasEffects    : 'AutoRnApp sagas effects',
}
