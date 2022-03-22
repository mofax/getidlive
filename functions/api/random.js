import { extractQuery, extractQueryParams } from "../common/common";

function buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}

function randomValues(val = 10) {
    const array = new Uint8Array(val);
    crypto.getRandomValues(array);
    return buf2hex(array.buffer);
}

export async function onRequest(context) {
    // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    const values = [];
    const query = extractQuery(extractQueryParams(request.url));

    for (let i = 0; i < query.n; i++) {
        const id = randomValues(query.bytes);
        values.push(id);
    }

    return new Response(values.join("\n"));
}
