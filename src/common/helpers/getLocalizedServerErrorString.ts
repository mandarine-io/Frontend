import { ServerError } from '../../api/createRequest'

export function getLocalizedServerErrorString(error: ServerError) {
    return error.message || 'Внутренняя ошибка сервера'
}
