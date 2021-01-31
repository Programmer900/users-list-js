import { User } from './users.js'
import { isValid } from './utils/validation'
import { debounce } from './utils/debounce'
import './plugins/notice'
import './style.css'

const form = document.getElementById('form')
const nameUser = form.querySelector('#name')
const phoneUser = form.querySelector('#phone')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', User.render)
form.addEventListener('submit', submitFormHandler)
nameUser.addEventListener('input', onChangeInput)
phoneUser.addEventListener('input', onChangeInput)

function onChangeInput() {
  debounce(function() {
    submitBtn.disabled = !(isValid(nameUser.value, {type: "minLength", value: 2}) && isValid(phoneUser.value, {type: "phone"}))
  }, 700, 1000)()
}

function submitFormHandler(event) {
  event.preventDefault()
  if(isValid(nameUser.value, {type: "minLength", value: 2}) && isValid(phoneUser.value, {type: "phone"})) {
    const uniq = 'id' + (new Date()).getTime()
    const user = {
      name: nameUser.value.trim(),
      phone: phoneUser.value,
      date: new Date().toJSON(),
      id: uniq
    }

    //Async request user to server
    User.create(user)
      .then(() => {
        nameUser.value = phoneUser.value = ''
        nameUser.className = phoneUser.className = ''
        submitBtn.disabled = true
        note({
          content: `Пользователь ${user.name}, успешно создан!`,
          type: 'success',
          time: 5
        })
      })
  } else {
    note({
      content: 'Минимальное кол-во символов 2',
      type: 'error',
      time: 5
    })
  }
}