import { call, put, takeLatest } from 'redux-saga/effects'
import * as <%- Name %>Redux from '../Redux/rx.<%- Name %>'
import api from '../Services/API/api.<%- Name %>'

const sagas = []
<% for( let action of actions ) { %>
sagas.push(takeLatest(<%- Name %>Redux.<%- Name %>Types.<%- action.NAME %>_REQUEST, function * (api, action) {
  const { <%- action.args.join() %> } = action
  // make the call to the api
  const response = yield call(api.<%- action.name %>, <%- action.args.join() %>)

  if (response.ok) {
    yield put(<%- Name %>Redux.<%- action.name %>Success(response.data))
  } else {
    yield put(<%- Name %>Redux.<%- action.name %>Failure())
  }
}, api))
<% } %>
export default sagas
