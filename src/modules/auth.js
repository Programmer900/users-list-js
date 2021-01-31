export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input id="email" type="email" required>
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required>
            <label for="password">Пароль</label>
        </div>
        <button type="submit" class="mui-btn mui-btn--raised">Войти</button>
    </form>
  `
}

export function authEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyDEFxoyU6GiaAtgwsgOa9lkfFkpQBK39PM'
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({email, password, returnSecureToken: true}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data.idToken)
}