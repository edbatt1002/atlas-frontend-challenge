import { telegramLink, whatsappLink } from '../utils'

describe('telegramLink', () => {
  it('builds a t.me deep link from a handle', () => {
    expect(telegramLink('sofia_model')).toBe('https://t.me/sofia_model')
  })
})

describe('whatsappLink', () => {
  it('builds a wa.me deep link from a phone number', () => {
    expect(whatsappLink('5511999998888')).toBe('https://wa.me/5511999998888')
  })
})
