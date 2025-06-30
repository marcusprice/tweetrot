import { JSX } from "solid-js"
import styles from "./styles.module.css"
import { A } from "@solidjs/router"

type AppShellProps = {
    children?: JSX.Element
}

export default function AppShell(props: AppShellProps): JSX.Element {
    // prettier-ignore
    return( 
        <div class={styles.app}>
            <div class={styles["nav-bar"]}>
                <div>
                    <div><A href="/"><i class="bi bi-twitter"></i></A> </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-house"></i>
                            Home
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-search"></i>
                            Search
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-bell"></i>
                            Notifications
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-envelope-open"></i>
                            Messages
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-chat"></i>
                            Dale Cooper
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-bookmark"></i>
                            Bookmarks
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-people"></i>
                            Communities
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-person"></i>
                            Profile
                        </A>
                    </div>
                    <div>
                        <A href="/">
                            <i class="bi bi-list"></i>
                            Lists
                        </A> 
                    </div>
                </div>
            </div>

            <div class={styles.content}>
                {props.children}
            </div>

            <div class={styles["content-suggestions"]}>

            </div>
        </div>
    )
}
