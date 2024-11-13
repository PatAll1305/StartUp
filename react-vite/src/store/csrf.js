import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const User = () => {

    const user = useSelector((state) => state.session?.user);

    if (user) {
        return user
    } else {
        throw new Error({ message: 'User possesses improper credentials for this action.' })
    }
}


export async function csrfFetch(url, options = {}) {
    const user = User()
    options.method = options.method || "GET";
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== "GET") {
        options.headers["Content-Type"] =
            options.headers["Content-Type"] || "application/json";
        options.headers["csrf_token"] = Cookies.get("csrf_token");
        options.headers["user_id"] = +user.id
    }

    const res = await window.fetch(url, options)

    if (res.status >= 400) throw res;

    return res;
}

export function restoreCSRF() {
    return csrfFetch("/api/");
}