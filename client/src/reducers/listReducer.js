const initialState = {
  room: {
    items:[],
    users: []
  },
  username: '',
  step: '',
  messages: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'ADD_MESSAGE':
      return {...state, messages: [action.payload, ...state.messages]}
    case 'NEW_ROOM':
      return {...state, room: action.payload}
    case 'POST_CHOICE':
      return {...state, choices: [...state.choices, action.payload]}
    case 'SET_CATEGORY':
      return {...state, category: action.payload}
    case 'SET_USERNAME':
      return {...state, username: action.payload}
    case 'UPDATE_ROOM':
      console.log('reducer', action.payload)
      return {...state, room: action.payload}
    case 'EDIT_STATUS':
      return {...state,
        room: {
          ...state.room,
          items: state.room.items.map(c => {
            if (c.id === action.id) {
              c.status = !c.status
            }
            return c
          })
        }
      }
    case 'NEXT_STEP':
      return {...state, step: action.payload}
    case 'COMPLETE':
      return {...state, step: 'complete'}
    case 'PASS_USERS':
      return {...state, room: action.payload}
    default:
      return state
  }
}