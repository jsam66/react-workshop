function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + action.amount
  } else if (action.type === 'DECREMENT') {
    return state - action.amount
  }
  else {
    return state
  }
}

const incrementAction = { type: 'INCREMENT', amount: 7 }

console.log(reducer(0, incrementAction)) // -> 1
console.log(reducer(1, incrementAction)) // -> 2
console.log(reducer(5, incrementAction)) // -> 6

const unknownAction = { type: 'UNKNOWN' }

console.log(reducer(5, unknownAction)) // -> 5
console.log(reducer(8, unknownAction)) // -> 8

const decrementAction = { type: 'DECREMENT', amount: 7 }

console.log(reducer(0, decrementAction)) // -> -1
console.log(reducer(1, decrementAction)) // -> 0
console.log(reducer(5, decrementAction)) // -> 4
