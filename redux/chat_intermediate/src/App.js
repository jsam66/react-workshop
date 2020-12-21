import React from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import uuid from 'uuid'

const reducer = combineReducers({
  activeThreadId,
  threads
})

function activeThreadId(state = '1-fca2', action) {
  if (action.type === 'OPEN_THREAD') {
    return action.id
  } else {
    return state
  }
}


function findThreadIndex(threads, action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return threads.findIndex(t => t.id === action.threadId)
    }
    case 'DELETE_MESSAGE': {
      return threads.findIndex(t => t.messages.find(m => m.id === action.id))
    }
  }
}


function threads(state = [
  {
    id: '1-fca2',
    title: 'buzz aldrin',
    messages: messageReducer(undefined, {})
  },
  {
    id: '2-be91',
    title: 'michael collins',
    messages: messageReducer(undefined, {})
  },
], action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'DELETE_MESSAGE': {
      const threadIndex = findThreadIndex(state, action)
      const oldThread = state[threadIndex]
      const newThread = Object.assign({}, oldThread, {
        messages: messageReducer(oldThread.messages, action)
      })
      return [
        ...state.slice(0, threadIndex),
        newThread,
        ...state.slice(threadIndex + 1, state.length)
      ]
    }
    default: {
      return state;
    }
  }
}

function messageReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const nMessage = {
        text: action.text,
        timestamp: Date.now(),
        id: uuid.v4()
      }
      return state.concat(nMessage)
    }
    case 'DELETE_MESSAGE': {
      return state.filter(m => m.id !== action.id)
    }
    default: {
      return state
    }
  }
}

const store = createStore(reducer);

const App = () => <div className='ui segment'>
  <ThreadTabs />
  <ThreadDisplay />
</div>

const Tabs = props => <div className='ui top attached tabular menu'>
  {
    props.tabs.map((t, i) => <div className={t.active ? 'active item' : 'item'} key={i} onClick={() => props.onClick(t.id)}>{t.title}</div>)
  }
</div>

const mapStateToTabsProps = state => {
  const tabs = state.threads.map(t => ({
    title: t.title,
    id: t.id,
    active: t.id === state.activeThreadId
  }))
  return { tabs }
}

const mapDispatchToTabsProps = dispatch => ({
  onClick: id => dispatch({
    type: 'OPEN_THREAD',
    id: id
  })
})

const ThreadTabs = connect(mapStateToTabsProps, mapDispatchToTabsProps)(Tabs)

class TextFieldSubmit extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.value)
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className='ui input'>
        <input
          onChange={this.onChange}
          value={this.state.value}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
      </div>
    );
  }
}

const Thread = props => <div className='ui center aligned basic segment'>
  <MessageList messages={props.thread.messages} onClick={props.onMessageClick} />
  <TextFieldSubmit onSubmit={props.onMessageSubmit} />
</div>

const mapStateToThreadProps = state => ({
  thread: state.threads.find(t => t.id === state.activeThreadId)
})

const mapDispatchToThreadProps = dispatch => ({
  onMessageClick: id => dispatch({
    type: 'DELETE_MESSAGE',
    id: id
  }),
  dispatch: dispatch
})

const mergeThreadProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onMessageSubmit: text => dispatchProps.dispatch({
    type: 'ADD_MESSAGE',
    text: text,
    threadId: stateProps.thread.id
  })
})

const ThreadDisplay = connect(mapStateToThreadProps, mapDispatchToThreadProps, mergeThreadProps)(Thread)

const MessageList = props => <div className='ui comments'>
  {
    props.messages.map((m, i) => <div key={i} className='comment' onClick={() => props.onClick(m.id)}><div className='text'></div>{m.text} <span className='metadata'>{m.timestamp}</span></div>)
  }
</div>

const WrappedApp = props => <Provider store={store}><App /></Provider>

export default WrappedApp;
