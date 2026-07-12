import { buildContactLink } from '../utils'

describe('buildContactLink', () => {
  it('builds a t.me deep link for telegram', () => {
    expect(buildContactLink('telegram', 'sofia_model')).toBe('https://t.me/sofia_model')
  })

  it('builds a wa.me deep link for whatsapp', () => {
    expect(buildContactLink('whatsapp', '5511999998888')).toBe('https://wa.me/5511999998888')
  })
})
