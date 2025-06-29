import { StatusCodes } from "../constants/http"
import { POST } from "../constants/routes"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/tokens"
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from "../errors/errors"
import { PostType } from "../types/post"

export function fetchPost(postID: number): Promise<PostType> {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const request = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(`${POST}/${postID}`, request)
        .then((result) => {
            if (result.status === StatusCodes.UNAUTHORIZED) {
                throw new UnauthorizedError()
            }

            if (result.status === StatusCodes.BAD_REQUEST) {
                throw new BadRequestError()
            }

            if (result.status === StatusCodes.NOT_FOUND) {
                throw new NotFoundError()
            }

            if (result.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                return new InternalServerError()
            }

            if (result.status !== StatusCodes.OK) {
                return new InternalServerError()
            }

            return result.json()
        })
        .then((json) => {
            const postJson = json as PostPayload
            return postJson
        })
}
