export const required = (propertyName) => {
  return val => val && val.length > 0 || `${propertyName} is required.`
}

export const minLength = (propertyName, minLength) => {
  return val => val && val.length >= minLength || `${propertyName} must be at least ${minLength} characters.`
}

export const maxLength = (propertyName, maxLength) => {
  return val => val && val.length <= maxLength || `${propertyName} must be less than ${maxLength} characters.`
}

export const emailFormat = () => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return v => v && pattern.test(v) || 'Ivalid email.'
}
