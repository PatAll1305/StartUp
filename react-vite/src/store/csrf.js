import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}, userId) {
    options.method = options.method || "GET";
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== "GET") {
        options.headers["Content-Type"] =
            options.headers["Content-Type"] || "application/json";
        options.headers["csrf_token"] = Cookies.get("csrf_token");
        options.headers["user_id"] = +userId
    }

    const res = await window.fetch(url, options)

    if (res.status >= 400) throw res;

    return res;
}

export function restoreCSRF() {
    return csrfFetch("/api/");
}