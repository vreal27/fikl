const initialState = {
  choices: [],
  category: '',
  username: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'POST_LIST':
      return {...state, choices: [...state.choices, action.choiceList]}
    case 'SET_CATEGORY':
      return {...state, category: action.payload}
    case 'SET_USERNAME':
      return {...state, username: action.payload}
    default:
      return state
  }
}