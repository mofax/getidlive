export function extractQuery(query = {}) {
    const stash = {
        n: 1,
        bytes: 8,
    }

    if (query.n) {
        try {
            stash.n = Math.floor(parseInt(query.n))
            if (stash.n > 99) {
                stash.n = 100
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (query.bytes) {
        try {
            stash.bytes = Math.floor(parseInt(query.bytes))
            if (stash.bytes > 32) {
                stash.bytes = 32
            }
        } catch (e) {
            console.error(e)
        }
    }

    return stash
}
