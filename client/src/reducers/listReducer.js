const initialState = {
  choices: [],
  example: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'POST_LIST':
      return {...state, choices: [...state.choices, action.choiceList]}
    default:
      return state
  }
}