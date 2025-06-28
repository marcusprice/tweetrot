import { createEffect, JSX } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { user } from "../store/user"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/tokens"
import { validateToken } from "../dao/user"

export default function RequireAuth(props: { children: JSX.Element; redirectTo: string }) {
    const navigate = useNavigate()

    createEffect(() => {
        if (!user()) {
            // try to get access token and authenticate
            const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
            if (token) {
                validateToken(token)
                    .then(() => {
                        navigate("/")
                    })
                    .catch(() => {
                        navigate(props.redirectTo ?? "/login", { replace: true })
                    })
            } else {
                navigate(props.redirectTo ?? "/login", { replace: true })
            }
        }
    })

    return <>{user() && props.children}</>
}
