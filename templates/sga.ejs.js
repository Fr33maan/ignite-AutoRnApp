/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var Name = props.Name
var actions = props.actions
var initialState = props.initialState
var devUrl = props.devUrl
var prodUrl = props.prodUrl
%>
import { call, put, takeLatest } from 'redux-saga/effects'
import * as <%- Name %>Redux from '<%- props.reduxRootDir %>/rdx.<%- Name %>'
import api from 'API/api.<%- Name %>'

const sagas = []
<% for( let action of actions ) {%>
sagas.push(takeLatest(<%- Name %>Redux.<%- Name %>Types.<%- action.NAME %>_REQUEST, function * (api, action) {
  <% if(action.args.length > 0) { %>const { <%- action.args.join(', ') %> } = action <% } %>
  // make the call to the api
  const response = yield call(api.<%- action.name %><% if(action.args.length > 0) { %>, <%- action.args.join(', ') %> <% } %>)

  if (response.ok) {
    yield put(<%- Name %>Redux.default.<%- action.name %>Success(response.data))
  } else {
    yield put(<%- Name %>Redux.default.<%- action.name %>Failure())
  }
}, api))
<% } %>
export default sagas
