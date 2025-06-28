import { createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { login } from "../dao/user"
import { BadRequestError, InternalServerError, UnauthorizedError } from "../errors/errors"

export default function Login() {
    const [identifier, setIdentifier] = createSignal("")
    const [password, setPassword] = createSignal("")
    const navigate = useNavigate()

    function handleClick(e: MouseEvent) {
        e.preventDefault()
        login(identifier(), password())
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                // TODO:
                if (err instanceof UnauthorizedError) {
                    // prompt user to try again
                }

                if (err instanceof BadRequestError) {
                    // probably shouldn't be allowed to happen, maybe group
                    // with internal server error
                }

                if (err instanceof InternalServerError) {
                    // toggle something went wrong error
                }
            })
    }

    return (
        <div>
            <form id="sign-in-form">
                <label for="identifier">Email or username</label>
                <input
                    value={identifier()}
                    name="identifier"
                    oninput={(e) => setIdentifier(e.target.value)}
                />
                <label for="password">Password</label>
                <input
                    value={password()}
                    oninput={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                />
            </form>

            <button type="submit" form="sign-in-form" value="Submit" onclick={handleClick}>
                Submit
            </button>
        </div>
    )
}
