const initialState = {
  choices: [],
  step: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'POST_CHOICE':
      return {...state, choices: [...state.choices, action.choiceList]}
    case 'EDIT_STATUS':
      return {...state, choices: state.choices.map(c => {
        if(c.id === action.id){
          c.status = !c.status
        }

        return c

      })}
    default:
      return state
  }
}