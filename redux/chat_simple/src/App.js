function createStore(reducer, initialState) {
  let state = initialState

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message)
    }
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [...state.messages.slice(0, action.index), ...state.messages.slice(action.index + 1, state.messages.length)]
    }
  }
  else {
    return state
  }
}

const initialState = { messages: [] }

const store = createStore(reducer, initialState)


const addMessageAction1 = {
  type: 'ADD_MESSAGE',
  message: 'how does it look, neil?'
}

store.dispatch(addMessageAction1)
const statev1 = store.getState()

const addMessageAction2 = {
  type: 'ADD_MESSAGE',
  message: 'looking good'
}

store.dispatch(addMessageAction2)
const statev2 = store.getState()

console.log('state v1')
console.log(statev1)
console.log('state v2')
console.log(statev2)

const deleteMessageAction = {
  type: 'DELETE_MESSAGE',
  index: 0
}

store.dispatch(deleteMessageAction)
const statev3 = store.getState()

console.log('state v3')
console.log(statev3)