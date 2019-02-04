const initialState = {
  example: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'EXAMPLE':
      return {...state, example: action.example}
    default:
      return state
  }
}