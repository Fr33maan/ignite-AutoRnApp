import R from 'ramda'

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatModel (Model) {
  const model = []
  const definition = {}

  Model.map(action => {
    const actionName = action[0]
    const args = action[1] || []
    const res = action[2] || []

    if (actionName === 'update') {
      args.map(arg => {
        const capAttr = capitalize(arg)
        action = [`update${capAttr}`, [`${arg}`], [...res]]
        model.push(action)
        definition[`update${capAttr}`] = {
          args: [`${arg}`],
          res: [`${arg}`]
        }
      })
    } else {
      model.push([actionName, args, res])
      definition[actionName] = {
        args,
        res
      }
    }
  })

  return { model, definition }
}

function createActionStates (Model) {
  return Model.map(action => {
    const CapAction = capitalize(action[0])
    return [
      `doing${CapAction}`,
      `done${CapAction}`,
      `error${CapAction}`
    ]
  })
}

export default function (Model) {
  const { model, definition } = formatModel(Model)
  const attributes = R.uniq(R.flatten(model.map(action => action[1])))
  // const attributes = R.flatten(R.uniq(R.flatten(model.map(action => action[1])), R.flatten(model.map(action => action[2]))))

  const actions = model.map(action => action[0])
  const states = [...R.flatten(createActionStates(model)), ...attributes]

  const obj = {
    model,
    definition,
    actions,
    states,
    attributes
  }

  return obj
}
