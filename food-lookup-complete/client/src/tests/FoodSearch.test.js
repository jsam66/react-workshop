// We populate this file in the chapter "Unit Testing"
/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme';
import React from 'react';
import FoodSearch from '../FoodSearch';
import Client from '../Client'

jest.mock('../Client.js')

describe('FoodSearch', () => {
  let wrapper
  const onFoodClick = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<FoodSearch onFoodClick={onFoodClick} />)
  })
  afterEach(() => {
    Client.search.mockClear()
    onFoodClick.mockClear()
  })
  it('should not display the remove button', () => {
    expect(wrapper.find('.remove.icon').length).toBe(0)
  })
  it('should not display any rows', () => {
    expect(wrapper.find('tbody tr').length).toEqual(0)
  })
  describe('user populates search field', () => {
    let value = 'brocc'
    beforeEach(() => {
      const input = wrapper.find('input').first()
      input.simulate('change', {
        target: { value }
      })
    })
    it('should update state property `searchValue`', () => {
      expect(wrapper.state().searchValue).toEqual(value)
    })
    it('should display the remove icon', () => {
      expect(wrapper.find('.remove.icon').length).toBe(1)
    })
    it('should call `Client.search()` with `value`', () => {
      const args = Client.search.mock.calls[0]
      expect(args[0]).toEqual(value)
    })
    describe('and API returns results', () => {
      let foods = [
        {
          description: 'Broccolini',
          kcal: '100',
          protein_g: '11',
          fat_g: '21',
          carbohydrate_g: '31',
        },
        {
          description: 'Broccoli rabe',
          kcal: '200',
          protein_g: '12',
          fat_g: '22',
          carbohydrate_g: '32',
        },
      ]
      beforeEach(() => {
        const args = Client.search.mock.calls[0]
        const cb = args[1]
        cb(foods)
        wrapper.update()
      });
      it('should set the state property `foods`', () => {
        expect(wrapper.state().foods).toEqual(foods)
      })
      it('should display two rows', () => {
        expect(wrapper.find('tbody tr').length).toEqual(2)
      })
      it('should render the description of first food', () => {
        expect(wrapper.html()).toContain(foods[0].description)
      })
      it('should render the description of second food', () => {
        expect(wrapper.html()).toContain(foods[1].description)
      })
      describe('then user clicks food item', () => {
        beforeEach(() => {
          const foodRow = wrapper.find('tbody tr').first()
          foodRow.simulate('click')
        });
        it('should call prop `onFoodClick`, with `food`', () => {
          const food = foods[0]
          expect(onFoodClick.mock.calls[0]).toEqual([food])
        })
      });

      describe('then user types more', () => {
        const value = 'broccx'
        beforeEach(() => {
          const input = wrapper.find('input').first()
          input.simulate('change', {
            target: { value }
          })
        });

        describe('and API returns no results', () => {
          beforeEach(() => {
            const args = Client.search.mock.calls[1]
            const cb = args[1]
            cb([])
            wrapper.update()
          });

          it('should set the state property `foods`', () => {
            expect(wrapper.state().foods).toEqual([])
          })
        });
      });
      describe('then user click remove button', () => {
        beforeEach(() => {
          const button = wrapper.find('.remove.icon').first()
          button.simulate('click')
        })
        it('should remove the button', () => {
          expect(wrapper.find('.remove.icon').length).toEqual(0)
        })
        it('should clear the `input` field', () => {
          const input = wrapper.find('input').first()
          expect(input.props().value).toEqual('')
        })
        it('should update the state property `foods`', () => {
          expect(wrapper.state().foods).toEqual([])
        })
      })
      describe('then user clear input with a backspace', () => {
        beforeEach(() => {
          const input = wrapper.find('input').first()
          input.simulate('change', {
            target: { value: '' }
          })
        })
        it('should not display any rows', () => {
          expect(wrapper.find('tbody tr').length).toEqual(0)
        })
      })
    });
  });
});
