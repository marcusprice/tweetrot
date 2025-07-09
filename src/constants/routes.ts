const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

// user routes
export const CREATE_USER_ENDPOINT = SERVER_ADDRESS + "/api/v1/user/create"
export const VALIDATE_TOKEN_ENDPOINT = SERVER_ADDRESS + "/api/v1/user"
export const LOGIN_ENDPOINT = SERVER_ADDRESS + "/api/v1/user/authenticate"
export const GET_POST_AUTHOR = SERVER_ADDRESS + "/api/v1/user/by-post/:id"

// timeline routes
export const GET_TIMELINE_POSTS = SERVER_ADDRESS + "/api/v1/timeline"

// post routes
export const POST = SERVER_ADDRESS + "/api/v1/post"
export const CREATE_POST = SERVER_ADDRESS + "/api/v1/post/create"
export const LIKE_POST = SERVER_ADDRESS + "/api/v1/post/:id/like"
export const RETWEET_POST = SERVER_ADDRESS + "/api/v1/post/:id/retweet"
export const BOOKMARK_POST = SERVER_ADDRESS + "/api/v1/post/:id/bookmark"

// comment routes
export const CREATE_COMMENT = SERVER_ADDRESS + "/api/v1/comment/create"
