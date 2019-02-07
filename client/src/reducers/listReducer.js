const initialState = {
  choices: [],
  category: '',
  roomcode: '',
  username: '',
  step: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'POST_CHOICE':
      console.log('reducer', action.payload)
      return {...state, choices: [...state.choices, action.payload]}
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
    default:
      return state
  }
}