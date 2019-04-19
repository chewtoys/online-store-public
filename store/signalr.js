// const signalR = require('signalr')
// const signalr = {
//   namespaced: true,
//   state: () => ({
//     connection: null,
//     connectionStarted: false,
//   }),
//   mutations: {
//     startConnection(state) {
//       if (state.connectionStarted) return
//       state.connection = new signalR.HubConnectionBuilder()
//         .withUrl('http://localhost:7000/signalr/')
//         .build()
//       state.connection.start()
//       state.connectionStarted = true
//       console.log('connection', this.connection)

//       state.connection.on('ReceiveMessage', (user, message) => {
//         debugger
//         console.log(user, message)
//       })
//     },
//     close(state) {
//       state.show = false
//       state.message = state.defaultMessage
//     },
//   },
// }
// export default signalr
