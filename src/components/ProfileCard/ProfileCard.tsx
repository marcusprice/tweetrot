import { createSignal, JSX, Setter, Show } from "solid-js"
import styles from "./styles.module.css"
import { Author } from "../../types/post"

type ProfileCardProps = {
    user: Author
    position: { x: number; y: number }
    onEnter: () => void
    onLeave: () => void
}

export default function ProfileCard(props: ProfileCardProps): JSX.Element {
    const [mouseOnButton, setMouseOnButton] = createSignal(false)
    // prettier-ignore
    return(
        <div
            class={styles["profile-card"]}
            style={`top: ${props.position.y}px; left: ${props.position.x}px`}
            onMouseEnter={props.onEnter}
            onMouseLeave={props.onLeave}
        >
            <div class={styles["top-row"]}>
                <div
                    class={styles["avatar"]}
                    style={`background-image: url('${props.user.avatar}')`}
                ></div> 
                    <Show when={props.user.viewerFollowing}>
                        <button 
                            class={styles["following-button"]}
                            onMouseEnter={() => setMouseOnButton(true)}
                            onMouseLeave={() => setMouseOnButton(false)}
                        >
                            {mouseOnButton() ? "Unfollow" : "Following"}
                        </button>
                    </Show>

                    <Show when={!props.user.viewerFollowing}>
                        <button class={styles["follow-button"]}>
                            Follow
                        </button>
                    </Show>
            </div>
            <div class={styles["text-content"]}>
                <span class={styles["display-name"]}>{props.user.displayName}</span>
                <span class={styles["username"]}>@{props.user.username}</span>
                <span class={styles["bio-text"]}>
                    {props.user.bio}
                </span>
                <div class={styles["following-details"]}>
                    <span class={styles["following-details-count"]}>{props.user.followingCount}</span>
                    <span class={styles["following-details-text"]}>Following</span>
                    
                    <span class={styles["following-details-count"]}>{props.user.followerCount}</span>
                    <span class={styles["following-details-text"]}>Followers</span>
                </div>
            </div>
        </div>
    )
}
