/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router"

import "./index.css"
import RequireAuth from "./wrappers/RequireAuth"
import Login from "./pages/login"
import Timeline from "./pages/timeline"

render(
    () => (
        <Router>
            <Route path="/login" component={Login} />

            <Route
                path="/"
                component={() => {
                    return (
                        <RequireAuth redirectTo="/login">
                            <Timeline />
                        </RequireAuth>
                    )
                }}
            />
        </Router>
    ),
    document.getElementById("root")!
)
