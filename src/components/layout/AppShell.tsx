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
                <div><A href="/">Home</A> </div>
                <div><A href="/">Search</A> </div>
                <div><A href="/">Notifications</A> </div>
                <div><A href="/">Messages</A> </div>
                <div><A href="/">Cooper</A> </div>
                <div><A href="/">Bookmarks</A> </div>
                <div><A href="/">Communities</A> </div>
                <div><A href="/">Profiles</A> </div>
                <div><A href="/">Lists</A> </div>
            </div>

            <div class={styles.content}>
                {props.children}
            </div>

            <div class={styles["content-suggestions"]}>

            </div>
        </div>
    )
}
