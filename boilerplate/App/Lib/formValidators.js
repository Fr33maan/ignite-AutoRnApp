const isRequired = field => ({
  fn: val => val && val.length,
  msg  : `${field} is required`
})

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isEmail = field => ({
  fn: val => emailRegex.test(val),
  msg  : `${field} must be an email`
})

const minLength = (field, minLength) => ({
  fn: val => val && val.length >= minLength,
  msg  : `${field} must be at least ${minLength} character long`
})

export default {
  isRequired,
  isEmail,
  minLength
}
