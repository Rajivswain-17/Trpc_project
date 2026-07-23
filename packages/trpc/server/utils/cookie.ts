
import type {CookieOptions, Response, Request} from 'express';

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 12 * ONE_MONTH;

const defaultCookieOption: CookieOptions = {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: ONE_YEAR,
}   

export function createCookieFactory(res: Response) {
    return function createCookie(
        name:  string,
        value: string,
        opts: CookieOptions = defaultCookieOption

    )  {
        res.cookie(name, value, opts)
    }
}

export function getCookieFactory(req: Request) {
    return function getCookie(name: string) {
        return req.cookies?.[name]
    }
}

export function clearCookieFactory(res: Response) {
    return function clearCookie(name: string) {
        res.clearCookie(name);
    }
}



