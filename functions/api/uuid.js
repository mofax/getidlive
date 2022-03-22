import { extractQuery } from '../common/common'

export async function onRequest(context) {
    // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context

    const values = []
    const query = extractQuery(request.url.query)

    for (let i = 0; i < query.n; i++) {
        const uuid = crypto.randomUUID()
        values.push(uuid)
    }

    return new Response(values.join('\n'))
}
