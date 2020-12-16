import React from 'react';
import isEmail from 'validator/lib/isEmail'
import PropTypes from 'prop-types'

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "01-basic-button";

  state = {
    people: [],
    fields: {
      name: '',
      email: ''
    },
    fieldErrors: {}
  }


  onFormSubmit = e => {
    const people = this.state.people
    const person = this.state.fields
    if (this.validate()) return
    e.preventDefault()
    if (Object.keys(this.state.fieldErrors).length) return
    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: ''
      },
    })
  }

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields
    const fieldErrors = this.state.fieldErrors
    fields[name] = value
    fieldErrors[name] = error
    this.setState({ fields, fieldErrors })
  }

  validate = () => {
    const person = this.state.fields
    const fieldErrors = this.state.fieldErrors
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k])
    if (!person.name) return true
    if (!person.email) return true
    if (errMessages.length) return true
    return false
  }

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
          <Field placeholder='Name' name='name' value={this.state.fields.name} onChange={this.onInputChange} validate={val => val ? false : 'Name required'} />
          <br />
          <Field placeholder='Email' name='email' value={this.state.fields.email} onChange={this.onInputChange} validate={val => isEmail(val) ? false : 'Invalid Email'} />
          <br />
          <input type='submit' disabled={this.validate()} />
        </form>
        <div>
          <h3>Names</h3>
          <ul>{this.state.people.map(({ name, email }, i) => <li key={i}>{name}
           ({email})</li>)}</ul>
        </div>
      </div>
    );
  }
};


class Field extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired
  }
  state = {
    value: this.props.value,
    error: false
  }
  componentWillReceiveProps(update) {
    this.setState({ value: update.value })
  }
  onChange = e => {
    const name = this.props.name
    const value = e.target.value
    const error = this.props.validate ? this.props.validate(value) : false
    this.setState({ value, error })
    this.props.onChange({ name, value, error })
  }
  render() {
    return <div>
      <input
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.onChange}
      />
      <span style={{ color: 'red' }}>{this.state.error}</span>
    </div>
  }
}
