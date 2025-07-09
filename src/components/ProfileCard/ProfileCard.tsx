import { createSignal, JSX, Setter, Show } from "solid-js"
import styles from "./styles.module.css"
import { Author } from "../../types/post"
import { follow } from "../../dao/user"

type ProfileCardProps = {
    user: Author
    position: { x: number; y: number }
    onEnter: () => void
    onLeave: () => void
    onFollow: (action: "follow" | "unfollow") => void
}

export default function ProfileCard(props: ProfileCardProps): JSX.Element {
    const [mouseOnButton, setMouseOnButton] = createSignal(false)

    function handleFollow(e: MouseEvent, action: "follow" | "unfollow") {
        e.preventDefault()

        follow(props.user.username, action)
            .then(() => {
                // handle post follow/unfollow action
                props.onFollow(action)
            })
            .catch((err) => {
                // TODO: handle error
            })
    }

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
                            onClick={(e) => {handleFollow(e, "unfollow")}}
                        >
                            {mouseOnButton() ? "Unfollow" : "Following"}
                        </button>
                    </Show>

                    <Show when={!props.user.viewerFollowing}>
                        <button
                            class={styles["follow-button"]}
                            onClick={(e) => {handleFollow(e, "follow")}}
                        >
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
