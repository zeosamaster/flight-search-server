import { Quotes } from '.'
import { User } from '../user'

let user, quotes

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  quotes = await Quotes.create({ user, Country: 'test', Currency: 'test', Locale: 'test', Origin: 'test', Destination: 'test', OutDate: 'test', InDate: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = quotes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(quotes.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Country).toBe(quotes.Country)
    expect(view.Currency).toBe(quotes.Currency)
    expect(view.Locale).toBe(quotes.Locale)
    expect(view.Origin).toBe(quotes.Origin)
    expect(view.Destination).toBe(quotes.Destination)
    expect(view.OutDate).toBe(quotes.OutDate)
    expect(view.InDate).toBe(quotes.InDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = quotes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(quotes.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Country).toBe(quotes.Country)
    expect(view.Currency).toBe(quotes.Currency)
    expect(view.Locale).toBe(quotes.Locale)
    expect(view.Origin).toBe(quotes.Origin)
    expect(view.Destination).toBe(quotes.Destination)
    expect(view.OutDate).toBe(quotes.OutDate)
    expect(view.InDate).toBe(quotes.InDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
