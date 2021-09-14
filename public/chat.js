// eslint-disable-next-line no-undef
const socket = io()

const urlSearch = new URLSearchParams(window.location.search)

const room = urlSearch.get('select_room')
const username = urlSearch.get('username')

document.getElementById('messages').innerHTML = `
  <span>Olá <span class="emphasis">${username}!</span> Você está na sala: <span class="emphasis">${room}</span></span>
  <br>
`

function parseFriendlyDate(date) {
  return date.toLocaleDateString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

function renderMessages(message) {
  const messagesDiv = document.getElementById('messages')
  messagesDiv.innerHTML += `
    <span class="message">${message.username} disse: ${
    message.content
  } - ${parseFriendlyDate(new Date(message.createdAt))}</span>
    <br>
  `
}

socket.emit(
  'joinChat',
  {
    room,
    username,
  },
  renderMessages
)

document
  .getElementById('text_message')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const message = {
        content: event.target.value,
        username,
        room,
        createdAt: new Date(),
      }

      socket.emit('message', message)
      event.target.value = ''
    }
  })

socket.on('message', (data) => {
  renderMessages(data)
})

document.getElementById('logout').addEventListener('click', () => {
  window.location.href = 'index.html'
})
