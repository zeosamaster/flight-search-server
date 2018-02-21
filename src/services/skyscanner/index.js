import rp from 'request-promise';

const apiKey = 'prtl6749387986743898559646983194';

export const endpoints = {
    locations: 'http://partners.api.skyscanner.net/apiservices/geo/v1.0'
};

export const get = (uri, qs) => {
    qs = Object.assign({}, qs, { apiKey });
    return rp({
        uri,
        qs,
        headers: { 'User-Agent': 'Request-Promise' },
        json: true
    });
}