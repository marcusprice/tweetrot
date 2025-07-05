import { StatusCodes } from "../constants/http"
import { BOOKMARK_POST, CREATE_POST, LIKE_POST, POST, RETWEET_POST } from "../constants/routes"
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
            const postJson = json as PostType
            return postJson
        })
}

export function createPost(content: string, image: File | undefined): Promise<PostType> {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (content === "" && image == undefined) {
        throw new BadRequestError("need content or image")
    }
    const formData = new FormData()

    if (content !== "") {
        formData.append("content", content)
    }

    if (image !== undefined) {
        formData.append("image", image)
    }

    const request = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    }

    return fetch(CREATE_POST, request)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            const post = json as PostType
            return post
        })
}

export function likePost(postID: number, method: "PUT" | "DELETE"): Promise<void> {
    const route = LIKE_POST.replace(":id", postID.toString())
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    const request = {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(route, request).then((response) => {
        if (response.status == StatusCodes.NO_CONTENT) {
            return
        } else {
            // TODO: handle errors
        }
    })
}

export function retweetPost(postID: number, method: "PUT" | "DELETE"): Promise<void> {
    const route = RETWEET_POST.replace(":id", postID.toString())
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    const request = {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(route, request).then((response) => {
        if (response.status == StatusCodes.NO_CONTENT) {
            return
        } else {
            // TODO: handle errors
        }
    })
}

export function bookmarkPost(postID: number, method: "PUT" | "DELETE"): Promise<void> {
    const route = BOOKMARK_POST.replace(":id", postID.toString())
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    const request = {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(route, request).then((response) => {
        if (response.status == StatusCodes.NO_CONTENT) {
            return
        } else {
            // TODO: handle errors
        }
    })
}
