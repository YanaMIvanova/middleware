import { callApi } from './callApi'
import { checkIsOrgDescendantOfParent } from './utils'

export const generateEndpoints = ({ app }) => {
    // organizations START
    app.get('/organizationsOfVaud', async (_req, res) => {
        try {
            const organizations = await callApi({
                path: 'organization',
                params: { page: 0, limit: 10000 }, // TODO unlimited? Just remove params?
            })

            res.json(organizations.filter(({ parent }) => parent?.name === 'vd-test-filter'))
        } catch (error) {
            console.error(error)
        }
    })
    // organizations END

    // users START
    app.get('/allUsers', async (_req, res) => {
        try {
            const users = await callApi({ path: 'user' })

            res.json(users)
        } catch (error) {
            console.error(error)
        }
    })

    app.get('/usersInVaud', async (_req, res) => {
        try {
            const users = await callApi({ path: 'user' })

            const filteredUsers = users.filter(
                ({ mainOrganization: { code, parent } }) =>
                    code === 'vd-test-filter' || parent?.code === 'vd-test-filter'
            )

            res.json(filteredUsers)
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
    // users END

    // courses START
    app.get('/courses', async (_req, res) => {
        try {
            const courses = await callApi({ path: 'data_source/all_courses/home' })

            res.json(courses ?? `No courses found`)
        } catch (error) {
            console.error(error)
        }
    })

    // app.get('/courseSessionsWithLearners', async (_req, res) => {
    //     try {
    //         const courseSessions = await callApi({ path: 'cursus_session' })
    //
    //         const sessionsWithLearners = courseSessions.filter((session) => session.participants.learners > 0)
    //
    //         sessionsWithLearners.forEach(({ id: sessionId }) =>
    //             (async () => {
    //                 const learners = await callApi({ path: `cursus_session/${sessionId}/users/learner` })
    //             })()
    //         )
    //
    //         res.json(sessionsWithLearners ?? `No sessions with learners found`)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // })
    // courses END
}
