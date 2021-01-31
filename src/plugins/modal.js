export function createModal(title, content) {
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.innerHTML = `
    <h1>${title}</h1>
    <div class="content">${content}</div>
  `
  mui.overlay('on', modal)
}