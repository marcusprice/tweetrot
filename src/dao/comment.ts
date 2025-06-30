import { CREATE_COMMENT } from "../constants/routes"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/tokens"
import { CommentType } from "../types/post"
import { StatusCodes } from "../constants/http"
import {
    UnauthorizedError,
    BadRequestError,
    NotFoundError,
    InternalServerError,
} from "../errors/errors"

export type PostCommentOptions = {
    postID: number
    content?: string
    image?: File
    parentCommentID?: number
}

export function postComment(opts: PostCommentOptions): Promise<CommentType> {
    const formData = new FormData()
    if (!opts.content && !opts.image) {
        throw new BadRequestError("need content or image")
    }

    formData.append("postID", opts.postID.toString())

    if (opts.content) {
        formData.append("content", opts.content)
    }

    if (opts.image) {
        formData.append("image", opts.image)
    }

    if (opts.parentCommentID) {
        formData.append("parentCommentID", opts.parentCommentID.toString())
    }

    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const request = {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(CREATE_COMMENT, request)
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
        .then((commentJson) => {
            const comment = commentJson as CommentType
            return comment
        })
}
