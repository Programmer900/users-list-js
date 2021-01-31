export function isValid(value, settings = null){
  switch (settings.type) {
    case "minLength":
      return value.length >= settings.value
      break;
    case "required":
      return value.length > 0
      break;
    case "phone":
      let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
      return regexp.test(value)
      break;
    default:
      return false
  }

}