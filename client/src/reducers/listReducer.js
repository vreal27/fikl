const initialState = {
  choices: [],
  category: '',
  roomcode: '',
  username: '',
  step: '',
  messages: [],
  users: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'POST_CHOICE':
      return {...state, choices: [...state.choices, action.choiceList]}
    case 'SET_CATEGORY':
      return {...state, category: action.payload}
    case 'SET_USERNAME':
      return {...state, username: action.payload}
    case 'SET_CODE':
      return {...state, roomcode: action.payload}
    case 'EDIT_STATUS':
      return {...state, choices: state.choices.map(c => {
        if(c.id === action.id){
          c.status = !c.status
        }
        return c
      })}
    case 'NEXT_STEP':
      return {...state, step: action.payload}
    case 'COMPLETE':
      return {...state, step: 'complete'}
    case 'PASS_USERS':
      return {...state, users: action.payload}
    default:
      return state
  }
}