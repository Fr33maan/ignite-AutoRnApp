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
sagas.push(takeLatest(ModalRedux.ModalsTypes.TOGGLE_<%- modal.NAME %>_MODAL, function * (action) { 
  // Put here any effects you might want on modal toggle
}))

sagas.push(takeLatest(ModalRedux.ModalsTypes.OPEN_<%- modal.NAME %>_MODAL, function * (action) { 
  // Put here any effects you might want on modal open
})) 

sagas.push(takeLatest(ModalRedux.ModalsTypes.CLOSE_<%- modal.NAME %>_MODAL, function * (action) { 
  // Put here any effects you might want on modal close
}))  
<% } %>
export default sagas
