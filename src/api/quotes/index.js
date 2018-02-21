import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Quotes, { schema } from './model'

const router = new Router()
const { Country, Currency, Locale, Origin, Destination, OutDate, InDate } = schema.tree

/**
 * @api {post} /quotes Create quotes
 * @apiName CreateQuotes
 * @apiGroup Quotes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Country Quotes's Country.
 * @apiParam Currency Quotes's Currency.
 * @apiParam Locale Quotes's Locale.
 * @apiParam Origin Quotes's Origin.
 * @apiParam Destination Quotes's Destination.
 * @apiParam OutDate Quotes's OutDate.
 * @apiParam InDate Quotes's InDate.
 * @apiSuccess {Object} quotes Quotes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quotes not found.
 * @apiError 401 user access only.
 */
router.post('/',
    token({ required: true }),
    body({ Country, Currency, Locale, Origin, Destination, OutDate, InDate }),
    create)

/**
 * @api {get} /quotes Retrieve quotes
 * @apiName RetrieveQuotes
 * @apiGroup Quotes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} quotes List of quotes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
    token({ required: true }),
    query(),
    index)

/**
 * @api {get} /quotes/:id Retrieve quotes
 * @apiName RetrieveQuotes
 * @apiGroup Quotes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} quotes Quotes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quotes not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
    token({ required: true }),
    show)

/**
 * @api {put} /quotes/:id Update quotes
 * @apiName UpdateQuotes
 * @apiGroup Quotes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Country Quotes's Country.
 * @apiParam Currency Quotes's Currency.
 * @apiParam Locale Quotes's Locale.
 * @apiParam Origin Quotes's Origin.
 * @apiParam Destination Quotes's Destination.
 * @apiParam OutDate Quotes's OutDate.
 * @apiParam InDate Quotes's InDate.
 * @apiSuccess {Object} quotes Quotes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quotes not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
    token({ required: true }),
    body({ Country, Currency, Locale, Origin, Destination, OutDate, InDate }),
    update)

/**
 * @api {delete} /quotes/:id Delete quotes
 * @apiName DeleteQuotes
 * @apiGroup Quotes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Quotes not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
    token({ required: true }),
    destroy)

export default router
