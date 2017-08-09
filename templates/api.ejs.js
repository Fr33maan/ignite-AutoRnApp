<%
function setDefaultHttpType(actionName) {
  if(actionName.match(/create/)) return 'post'
  if(actionName.match(/update/)) return 'put'
  if(actionName.match(/delete/)) return 'delete'

  return 'get'
}
%>
/*
Auto generated file by AutoRnApp
You can override for each action: headers, args and http request type (get by default)
*/

import apisauce from 'apisauce'

const env = process.env.NODE_ENV
const devUrl = <%- devUrl %>
const prodUrl = <%- prodUrl %>
const rootUrl = env === 'production' ? prodUrl : devUrl
let defaultHeaders = {}

// Will try to find out default headers in the same file
try {defaultHeaders = require('./defaultHeaders')}catch(e){}

export default {
  create<%- Name %>Api: rootUrl => {

    const api = apisauce.create({
      rootUrl,
      timeout: 10000
    })

    return {
      <% for (let action of actions) {
      var defaultHttpType = setDefaultHttpType(action.name)
      %>
      <%- action.name %>: (args, additionalHeaders, httpType='<%- defaultHttpType %>') => {
        let headers = defaultHeaders
        if(additionalHeaders && (typeof additionalHeaders === 'object')) {
          headers = {...defaultHeaders, ...additionalHeaders}
        }

        return api[httpType]('<%- action.name %>', args, headers)
      }<% } %>
    }
  }
}
