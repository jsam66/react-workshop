import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  it('should have the `th` "Items"', () => {
    expect(wrapper.contains(<th>Items</th>)).toBe(true)
  })
  it('should have `input` element', () => {
    expect(wrapper.containsMatchingElement(<input />)).toBe(true)
  })
  it('should have a `button`', () => {
    expect(wrapper.containsMatchingElement(<button>Add item</button>)).toBe(true)
  })
  it('`button` should be disabled', () => {
    const button = wrapper.find('button').first()
    expect(button.props().disabled).toBe(true)
  })
  describe('the user populate the `input`', () => {
    const item = 'vancouver'
    beforeEach(() => {
      const input = wrapper.find('input').first()
      input.simulate('change', {
        target: { value: item }
      })
    })
    it('should enable `button`', () => {
      const button = wrapper.find('button').first()
      expect(button.props().disabled).toBe(false)
    })
    it('should update state property `item`', () => {
      expect(wrapper.state().item).toEqual(item)
    })
    describe('and then clears the input', () => {
      beforeEach(() => {
        const input = wrapper.find('input').first()
        input.simulate('change', {
          target: { value: '' }
        })
      })
      it('should disable `button`', () => {
        const button = wrapper.find('button').first()
        expect(button.props().disabled).toBe(true)
      })
    })
    describe('and then submit the form', () => {
      beforeEach(() => {
        const form = wrapper.find('form').first()
        form.simulate('submit', {
          preventDefault: () => { }
        })
      })
      it('should add item to state', () => {
        expect(wrapper.state().items).toContain(item)
      })
      it('should render item in the table', () => {
        expect(wrapper.containsMatchingElement(<td>{item}</td>)).toBe(true)
      })
      it('should clear the input field', () => {
        const input = wrapper.find('input').first()
        expect(input.props().value).toEqual('')
      })
      it('should disable `button`', () => {
        const button = wrapper.find('button').first()
        expect(button.props().disabled).toBe(true)
      })
    })

  })
})
