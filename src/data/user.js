export function mockUser() {
  const data = [
    {name: 'Ed', phone: '+74958889898', date: '', id: '1'},
    {name: 'Max', phone: '+79090009999', date: '', id: '2'},
    {name: 'John Doe', phone: '+77679993322', date: '', id: '3'},
    {name: 'Leo', phone: '+79999999999', date: '', id: '4'},
  ]

  localStorage.setItem('users', JSON.stringify(data))
  return JSON.stringify(data)
}