import fetch from 'node-fetch'
import { apiToken, apiUrl } from './defaultConfig'

/**
 * Generate an endpoint handler that will fetch a certain path from the configured API URL
 * by using GET parameters and a filter predicate function
 *
 * @param {object} args
 * @param {string} args.path
 * @param {object} args.params
 * @param {function} args.predicate - the predicate function to filter the result set from the API response
 * @returns the endpoint handler
 */
export const onEndpointCalled =
    ({ path, params, predicate }) =>
    async (_req, res) => {
        try {
            const url = new URL(path, apiUrl)
            const urlParams = {
                apitoken: apiToken,
                ...params,
            }

            url.search = new URLSearchParams(urlParams)

            const result = await (await fetch(url)).json()

            res.json(result.filter(predicate))
        } catch (error) {
            console.error(error)
        }
    }
