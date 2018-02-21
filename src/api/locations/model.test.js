import { Locations } from '.'

let locations

beforeEach(async () => {
  locations = await Locations.create({ PlaceId: 'test', IataCode: 'test', Name: 'test', Type: 'test', SkyscannerCode: 'test', CityName: 'test', CityId: 'test', CountryName: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = locations.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(locations.id)
    expect(view.PlaceId).toBe(locations.PlaceId)
    expect(view.IataCode).toBe(locations.IataCode)
    expect(view.Name).toBe(locations.Name)
    expect(view.Type).toBe(locations.Type)
    expect(view.SkyscannerCode).toBe(locations.SkyscannerCode)
    expect(view.CityName).toBe(locations.CityName)
    expect(view.CityId).toBe(locations.CityId)
    expect(view.CountryName).toBe(locations.CountryName)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = locations.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(locations.id)
    expect(view.PlaceId).toBe(locations.PlaceId)
    expect(view.IataCode).toBe(locations.IataCode)
    expect(view.Name).toBe(locations.Name)
    expect(view.Type).toBe(locations.Type)
    expect(view.SkyscannerCode).toBe(locations.SkyscannerCode)
    expect(view.CityName).toBe(locations.CityName)
    expect(view.CityId).toBe(locations.CityId)
    expect(view.CountryName).toBe(locations.CountryName)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
