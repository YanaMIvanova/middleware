import { onEndpointCalled } from './onEndpointCalled'

export const generateEndpoints = ({ app }) => {
    app.get(
        '/organizations',
        onEndpointCalled({
            path: 'organization/list/recursive',
            params: { page: 0, limit: 10000 }, // TODO unlimited?
            predicate: ({ code }) => code.includes('vd'), // TODO remove test filter
        })
    )
}
