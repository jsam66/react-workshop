import Modash from './Modash'

describe('Modash', () => {
  describe('`truncate()`', () => {
    const string = 'there was one catch, and that was CATCH-22'
    it(`should truncate a string`, () => {
      expect(Modash.truncate(string, 19)).toEqual('there was one catch...')
    })
    it(`no-ops if string <= length`, () => {
      expect(Modash.truncate(string, string.length)).toEqual(string)
    })
  })
  describe('`capitalize()`', () => {
    const string = 'there was one catch, and that was CATCH-22'
    it('should capitalize string', () => {
      expect(Modash.capitalize(string)).toEqual('There was one catch, and that was catch-22')
    })
  })
  describe('`camelCase()`', () => {
    it('should camelize string with spaces', () => {
      const string = 'customer responded at'
      expect(Modash.camelCase(string)).toEqual('customerRespondedAt')
    })
    it('should camelize string with underscore', () => {
      const string = 'customer_responded_at'
      expect(Modash.camelCase(string)).toEqual('customerRespondedAt')
    })
  })

})