import { createSignal } from "solid-js"
import { User } from "../types/user"

export const [user, setUser] = createSignal<User | null>()
