import { sign } from '../../services/jwt'
import { success } from '../../services/response/'

export const login = ({ user }, res, next) =>
    sign(user.id)
        .then((token) => ({ token, user: user.view(true) }))
        .then(success(res, 201))
        .catch(next)

export const logout = (req, res, next) => {
    Promise.resolve()
        .then(() => req.logout())
        .then(() => ({ success: true }))
        .then(success(res, 200))
        .catch(next)
}