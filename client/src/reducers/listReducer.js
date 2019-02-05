const initialState = {
  choices: [],
  category: '',
  username: '',
  step: '',
  messages: []
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
    case 'EDIT_STATUS':
      return {...state, choices: state.choices.map(c => {
        if(c.id === action.id){
          c.status = !c.status
        }
        return c
      })}
    case 'COMPLETE':
      return {...state, step: 'complete'}
    default:
      return state
  }
}