import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import DebugConfig from '../Config/DebugConfig'
import ModalSagas from 'Sagas/sga.modals' 
// AutoRnApp sagas imports

/* ------------- Connect Types To Sagas ------------- */
const sagas = function * root () {
  yield [
    ...ModalSagas,
    // AutoRnApp sagas effects
  ]
}

export default sagas
