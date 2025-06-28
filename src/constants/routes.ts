const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS
export const CREATE_USER_ENDPOINT = SERVER_ADDRESS + "/api/v1/user/create"
export const VALIDATE_TOKEN_ENDPOINT = SERVER_ADDRESS + "/api/v1/user"
export const LOGIN_ENDPOINT = SERVER_ADDRESS + "/api/v1/user/authenticate"
