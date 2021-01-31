import { isValid } from './utils/validation'
import { mockUser } from './data/user'

export class User {
  static create(user) {
    return fetch('https://users-js-default-rtdb.europe-west1.firebasedatabase.app/peoples.json', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      user.id = response.name
      return user
    })
    .then(addToLocalStorage)
    .then(User.render)
  }
  static update(user) {
    const allUsers = getUsersFromLocalStorage()

    const editUsers = allUsers.map(u => {
      if(u.id == user.id) {
        u.name = user.name
        u.phone = user.phone
      }
      return u
    })
    setLocalStorage(editUsers)
    User.render()
  }
  static delete(userID) {
    let allUsers = JSON.parse(localStorage.getItem('users') || '[]').filter(u => u.id !== userID)
    setLocalStorage(allUsers)
    User.render()
  }
  static renderUser(user) {
    console.log('Edit user: > ', user)
  }
  static render() {
    const users = getUsersFromLocalStorage() || mockUser()

    if(!users.length) {
      note({
        content: `Пользователей нет! Добавьте их!`,
        type: 'info',
        time: 10
      })
    }

    const html = users.length ? users.map(cardUser).join('') : `Пользователей нет!`
    const list = document.getElementById('user')

    const headerTable = users.length ? `<thead>
        <tr class="head-title">
            <th>Имя</th>
            <th>Телефон</th>
            <th></th>
        </tr>
      </thead>` : ``

    list.innerHTML = headerTable + html

    //Method remove user
    const btnDelete = document.querySelectorAll('.btn-user-delete')
    const btnEdit = document.querySelectorAll('.btn-user-edit')

    btnDelete.forEach(btn => {
      const id = btn.dataset.id
      btn.addEventListener('click', function () {
        const UserName = User.getInfo(id).name
        User.delete(id)

        note({
          content: `Пользователь, ${UserName} успешно удален!`,
          type: 'warn',
          time: 5
        })
      })
    })
    btnEdit.forEach(function(btn) {
      const id = btn.dataset.id

      btn.addEventListener('click', function () {
        const parent = this.parentElement.parentElement
        const elInputName = parent.querySelector('.name-block')
        const elInputPhone = parent.querySelector('.phone-block')
        const btnEdit = parent.querySelector('.btn-user-edit')
        const icon = parent.querySelector('i')

        btnEdit.classList.remove('mui-btn--primary')

        if(parent.classList.contains('edited')){
          const valueName = elInputName.querySelector('#name').value
          const valuePhone = elInputPhone.querySelector('#phone').value

          if(isValid(valueName, {type: "minLength", value: 2}) && isValid(valuePhone, {type: "phone"})) {
            icon.classList = 'fas fa-edit'
            parent.classList.add('saved')

            const user = {
              name: valueName,
              phone: valuePhone,
              date: new Date().toJSON(),
              id
            }

            User.renderUser(user)
            User.update(user)
          } else {
            note({
              content: 'Валидация не пройдена!!',
              type: 'error',
              time: 5
            })
          }
        } else {
          icon.classList = 'fas fa-save'
          elInputName.innerHTML = `<div class="mui-textfield __ed"><input id="name" type="text" required value="${User.getInfo(id).name}"></div>`
          elInputPhone.innerHTML = `<div class="mui-textfield __ed"><input type="phone" id="phone" required value="${User.getInfo(id).phone}"></div>`
        }
        parent.classList.add('edited')
      })
    })
  }
  static getInfo(id) {
    console.log("getInfo id", id)
    const users = getUsersFromLocalStorage()

    const userInfo = users.find(item => item.id == id)
    console.log('userInfo: ', userInfo)
    return userInfo
  }
}

function addToLocalStorage(user) {
  const allUsers = getUsersFromLocalStorage()
  allUsers.push(user)
  setLocalStorage(allUsers)
}

function getUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem('users') || mockUser())
}

function cardUser(user) {
  return `
    <tr class="user-info" data-user="${user.id}">
      <td class="name-block">${user.name}</td>
      <td class="phone-block">${user.phone}</td>
      <td class="btn-blocks">
        <button data-id="${user.id}" class="mui-btn mui-btn--small mui-btn--primary mui-btn--fab btn-user-edit"><i class="fas fa-pen"></i></button>
        <button data-id="${user.id}" class="mui-btn mui-btn--small mui-btn--danger mui-btn--fab btn-user-delete"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `
}

// Helper f()
function setLocalStorage(data) {
  localStorage.setItem('users', JSON.stringify(data))
}