import { createEffect, createSignal, JSX, Show } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { setUser, user } from "../store/user"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/tokens"
import { validateToken } from "../dao/user"

export default function RequireAuth(props: { children: JSX.Element; redirectTo: string }) {
    const navigate = useNavigate()
    const [checkingAuth, setCheckingAuth] = createSignal(true)

    createEffect(() => {
        if (user()) {
            setCheckingAuth(false)
            return
        }

        const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
        if (!token) {
            navigate(props.redirectTo ?? "/login", { replace: true })
            return
        }

        validateToken(token)
            .then((userJson) => {
                setUser(userJson)
                setCheckingAuth(false)
            })
            .catch(() => {
                navigate(props.redirectTo ?? "/login", { replace: true })
            })
    })

    // prettier-ignore
    return (
        <Show when={!checkingAuth()}>
            {props.children}        
        </Show>
    )
}
