export class GenericAPIError extends Error {
    constructor(
        status: number,
        msg: string = `Unexpected API error: ${status}`
    ) {
        super(msg)
        this.name = "GenericAPIError"
    }
}

export class BadRequestError extends Error {
    constructor(msg = "Bad request") {
        super(msg)
        this.name = "BadRequestError"
    }
}

export class UnauthorizedError extends Error {
    constructor(msg = "Unauthorized") {
        super(msg)
        this.name = "UnauthorizedError"
    }
}

export class NotFoundError extends Error {
    constructor(msg = "Not found") {
        super(msg)
        this.name = "NotFoundError"
    }
}

export class InternalServerError extends Error {
    constructor(msg = "Internal server error") {
        super(msg)
        this.name = "InternalServerError"
    }
}
