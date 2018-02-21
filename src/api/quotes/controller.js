import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Quotes } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Quotes.create({ ...body, user })
    .then((quotes) => quotes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Quotes.find(query, select, cursor)
    .populate('user')
    .then((quotes) => quotes.map((quotes) => quotes.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Quotes.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((quotes) => quotes ? quotes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Quotes.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((quotes) => quotes ? Object.assign(quotes, body).save() : null)
    .then((quotes) => quotes ? quotes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Quotes.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((quotes) => quotes ? quotes.remove() : null)
    .then(success(res, 204))
    .catch(next)
