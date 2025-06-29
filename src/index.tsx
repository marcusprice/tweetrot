/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router"

import "./index.css"
import RequireAuth from "./wrappers/RequireAuth"
import Login from "./pages/login/login"
import Timeline from "./pages/timeline/timeline"
import AppShell from "./components/layout/AppShell"
import { Post } from "./pages/post/post"

render(
    () => (
        <Router>
            <Route path="/login" component={Login} />

            <Route
                path="/post/:id"
                component={() => {
                    return (
                        <RequireAuth redirectTo="/login">
                            <AppShell>
                                <Post />
                            </AppShell>
                        </RequireAuth>
                    )
                }}
            />

            <Route
                path="/"
                component={() => {
                    return (
                        <RequireAuth redirectTo="/login">
                            <AppShell>
                                <Timeline />
                            </AppShell>
                        </RequireAuth>
                    )
                }}
            />
        </Router>
    ),
    document.getElementById("root")!
)
