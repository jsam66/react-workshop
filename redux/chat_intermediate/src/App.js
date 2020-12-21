import React from 'react';
import { createStore } from 'redux'
import uuid from 'uuid'

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    const nMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuid.v4()
    }
    const threadIndex = state.threads.findIndex(t => t.id === action.threadId)
    const oldThread = state.threads[threadIndex]
    const newThread = Object.assign({}, oldThread, {
      messages: oldThread.messages.concat(nMessage)
    })
    return {
      ...state,
      threads: [
        ...state.threads.slice(0, threadIndex), newThread, ...state.threads.slice(threadIndex + 1, state.threads.length)
      ]
    }
  } else if (action.type === 'DELETE_MESSAGE') {
    const threadIndex = state.threads.findIndex(t => t.messages.find(m => m.id === action.id))
    const oldThread = state.threads[threadIndex]
    const newThread = Object.assign({}, oldThread, {
      messages: oldThread.messages.filter(m => m.id !== action.id)
    })
    return {
      ...state,
      threads: [
        ...state.threads.slice(0, threadIndex),
        newThread,
        ...state.threads.slice(threadIndex + 1, state.threads.length)
      ]
    };
  } else if (action.type === 'OPEN_THREAD') {
    return {
      ...state,
      activeThreadId: action.id
    }
  }
  else {
    return state;
  }
}

const initialState = {
  activeThreadId: '1-fca2',
  threads: [
    {
      id: '1-fca2',
      title: 'Buzz aldrin',
      messages: [
        {
          text: 'twelve minutes to ignition',
          timestamp: Date.now(),
          id: uuid.v4()
        }
      ]
    },
    {
      id: '2-be91',
      title: 'Michael collins',
      messages: []
    }
  ]
};

const store = createStore(reducer, initialState);

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState()
    const activeThreadId = state.activeThreadId
    const threads = state.threads
    const activeThread = threads.find(t => t.id === activeThreadId)
    const tabs = threads.map(t => ({
      title: t.title,
      active: t.id === activeThread.id,
      id: t.id
    }))
    return (
      <div className='ui segment'>
        <ThreadTabs tabs={tabs} />
        <Thread thread={activeThread} />
      </div>
    );
  }
}

class ThreadTabs extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'OPEN_THREAD',
      id: id
    })
  }
  render() {
    const tabs = this.props.tabs.map((t, i) => <div key={i} className={t.active ? 'active item' : 'item'} onClick={() => this.handleClick(t.id)}>{t.title}</div>)
    return <div className='ui top attached tabular menu'>
      {tabs}
    </div>
  }
}

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      text: this.state.value,
      threadId: this.props.threadId
    });
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

class Thread extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id
    });
  };

  render() {
    const messages = this.props.thread.messages.map(m => (
      <div
        className='comment'
        key={m.id}
        onClick={() => this.handleClick(m.id)}
      >
        {m.text}
        <span className='metadata'>@{m.timestamp}</span>
      </div>
    ));
    return (
      <div className='ui center aligned basic segment'>
        <div className='ui comments'>
          {messages}
        </div>
        <MessageInput threadId={this.props.thread.id} />
      </div>
    );
  }
}

export default App;
