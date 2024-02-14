import EventEmitter from 'events'

const eventEmitter = new EventEmitter()
const EVENT_NAME = 'message.to.room'

const EventMessage = {
  emit: (room, event, ...args) => {
    eventEmitter.emit(EVENT_NAME, room, event, ...args)
  },

  on: (cb) => {
    eventEmitter.on(EVENT_NAME, cb)
  },
}

export default EventMessage
