import { success, notFound } from "../../services/response/";
import { getLocations, refreshLocations } from './service';

export const get = ({ querymen: { query, select, cursor } }, res, next) => {
    let unlimitedCursor = Object.assign({}, cursor, { limit: null });
    return getLocations(query, select, unlimitedCursor)
        .then(success(res))
        .catch(next);
}

export const update = (req, res, next) =>
    refreshLocations()
        .then(success(res))
        .catch(next);
