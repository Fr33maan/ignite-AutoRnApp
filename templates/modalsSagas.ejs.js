/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var modals = props.modals
%>
import { call, put, takeLatest } from 'redux-saga/effects'
import * as ModalRedux from 'Redux/rdx.modals'

const sagas = []
<% for( let modal of modals ) { %>
sagas.push(takeLatest(ModalRedux.ModalsTypes.TOGGLE_<%- modal.NAME %>_MODAL_REQUEST, function * (action) { 
  try{ 
    yield put(ModalRedux.default.toggle<%- modal.Name %>ModalSuccess()) 
  }catch(e){ 
    console.log(e) 
  } 
})) 
<% } %>
export default sagas
