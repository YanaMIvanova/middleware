import fetch from 'node-fetch'
import { apiToken, apiUrl } from './defaultConfig'

export const callApi = async ({ path = '', params = {}, predicate = () => true }) =>
    (
        await (await fetch(`${new URL(path, apiUrl)}?${new URLSearchParams({ ...params, apitoken: apiToken })}`)).json()
    )?.data?.filter(predicate)
