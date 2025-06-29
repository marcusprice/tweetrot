import type { Component } from "solid-js"

import styles from "./App.module.css"
import Login from "./pages/login"

const App: Component = () => {
    console.log(import.meta.env.VITE_SERVER_ADDRESS)
    return (
        <div class={styles.App}>
            <Login />
        </div>
    )
}

export default App
