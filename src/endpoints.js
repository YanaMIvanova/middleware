import { callApi } from './callApi'
import { checkIsOrgDescendantOfParent } from './utils'

export const generateEndpoints = ({ app }) => {
    app.get('/organizationsOfVaud', async (_req, res) => {
        try {
            const organizations = await callApi({
                path: 'organization',
                params: { page: 0, limit: 10000 }, // TODO unlimited? Just remove params?
                predicate: ({ parent }) => parent?.name === 'vd-test-filter',
            })

            res.json(organizations)
        } catch (error) {
            console.error(error)
        }
    })

    app.get('/usersInVaud', async (_req, res) => {
        try {
            const users = await callApi({
                path: 'user',
                predicate: ({ mainOrganization: { code, parent } }) =>
                    code === 'vd-test-filter' || parent?.code === 'vd-test-filter',
            })

            res.json(users)
        } catch (error) {
            console.error(error)
        }
    })

    app.get('/usersInVaudDeep', async (_req, res) => {
        try {
            const organizations = await callApi({ path: 'organization/list/recursive' })
            const allUsers = await callApi({ path: 'user' })
            const parentOrg = 'vd-test-filter'
            const usersInVaud = allUsers?.filter(
                ({ mainOrganization: { code: userOrgCode } }) =>
                    userOrgCode === parentOrg ||
                    checkIsOrgDescendantOfParent({ organizations, parentOrg, childOrg: userOrgCode })
            )

            res.json(usersInVaud ?? `No users found in ${parentOrg}`)
        } catch (error) {
            console.error(error)
        }
    })
}
