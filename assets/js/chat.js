let Chat = {
  init(socket) {
    console.log("init")
    let channel = socket.channel('room:lobby', {})
    channel.join()
    this.listenForChats(channel)
  },

  listenForChats(channel) {
    document.getElementById('chat-form').addEventListener('submit', function(e) {
      console.log("sending")
      e.preventDefault

      let name = document.getElementById('user-name').value
      let message = document.getElementById('user-msg').value

      channel.push('shout', { name: name, body: message })

      // document.getElementById('user-name').value = ''
      document.getElementById('user-msg').value = ''
    })

    channel.on('shout', payload => {
      console.log("received")
      let chat = document.querySelector('#chat-box')
      let messages = document.createElement('p')

      messages.insertAdjacentHTML('beforeend', `${payload.name}: ${payload.body}`)
      chat.appendChild(messages)
    })
  }
}

export default Chat
