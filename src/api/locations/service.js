import { endpoints, get } from "../../services/skyscanner";
import { Locations } from ".";

export const getLocations = (query, select, cursor) =>
    Locations.find(query, select, cursor)
        .then(locations => locations.map(location => location.view()));

export const refreshLocations = () =>
    getLocations()
        .then(mapLocations)
        .then(updateCollection);

const mapLocations = data =>
    data.Continents.reduce((continentsList, continent) => {
        return continentsList.concat(mapContinent(continent))
    }, []);

const mapContinent = continent =>
    continent.Countries.reduce((countriesList, country) => {
        let newCountries = mapCountry(country);
        newCountries = newCountries.map(newCountry =>
            Object.assign({}, newCountry, {
                ContinentId: continent.Id,
                ContinentName: continent.Name
            })
        );
        return countriesList.concat(newCountries);
    }, []);

const mapCountry = country =>
    country.Cities.reduce((citiesList, city) => {
        let newCities = mapCity(city);
        newCities = newCities.map(newCity =>
            Object.assign({}, newCity, {
                CountryId: country.Id,
                CountryName: country.Name
            })
        );
        return citiesList.concat(newCities);
    }, []);

const mapCity = city =>
    city.Airports.reduce((airportsList, airport) => {
        let newAirport = mapAirport(airport);
        newAiport = Object.assign({}, newAirport, {
            CityId: city.Id,
            CityName: city.Name
        });
        return airportsList.concat(newAirport);
    }, []);

const mapAirport = airport => {
    let coords = airport.Location.split(", ");
    return {
        Code: airport.Id,
        Name: airport.Name,
        CoordsY: parseInt(coords[0], 10),
        CoordsX: parseInt(coords[1], 10)
    };
};

const updateCollection = locations =>
    Locations.remove({})
        .then(() => Locations.insertMany(locations));
