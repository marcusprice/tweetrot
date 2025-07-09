import { GET_POST_AUTHOR, LOGIN_ENDPOINT, VALIDATE_TOKEN_ENDPOINT } from "../constants/routes"
import { User } from "../types/user"
import { setUser } from "../store/user"
import {
    BadRequestError,
    GenericAPIError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from "../errors/errors"
import { StatusCodes } from "../constants/http"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/tokens"
import { Author } from "../types/post"

export function login(identifier: string, password: string): Promise<void> {
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: identifier,
            password: password,
        }),
    }

    return fetch(LOGIN_ENDPOINT, request)
        .then((result) => {
            if (result.status == StatusCodes.UNAUTHORIZED) {
                throw new UnauthorizedError()
            }

            if (result.status == StatusCodes.BAD_REQUEST) {
                result.text().then((respBody) => {
                    throw new BadRequestError(respBody)
                })
            }

            if (result.status == StatusCodes.NOT_FOUND) {
                throw new NotFoundError()
            }

            if (result.status == StatusCodes.INTERNAL_SERVER_ERROR) {
                throw new InternalServerError()
            }

            if (result.status != StatusCodes.OK) {
                throw new GenericAPIError(result.status)
            }

            const authHeader = result.headers.get("Authorization")
            const token = authHeader?.split(" ")[1]

            if (!token) {
                throw new InternalServerError()
            } else {
                window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
            }

            return result.json()
        })
        .then((json) => {
            setUser({
                username: json.username,
                email: json.email,
                firstName: json.firstName,
                lastName: json.lastName,
                displayName: json.displayName,
                avatar: json.avatar,
            })
        })
}

export function validateToken(token: string): Promise<User> {
    const request = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return fetch(VALIDATE_TOKEN_ENDPOINT, request)
        .then((res) => {
            if (res.status == StatusCodes.UNAUTHORIZED) {
                throw new UnauthorizedError()
            }

            if (res.status !== StatusCodes.OK) {
                throw new InternalServerError()
            }

            return res.json()
        })
        .then((userJson) => {
            const user = userJson as User
            return user
        })
}

export function fetchAuthor(postID: number): Promise<Author> {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const route = GET_POST_AUTHOR.replace(":id", postID.toString())

    const request = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(route, request)
        .then((response) => {
            if (response.status !== StatusCodes.OK) {
                throw new BadRequestError("")
            }

            return response.json()
        })
        .then((json) => {
            const authorData = json as Author
            return authorData
        })
}
