import { JSX, Setter } from "solid-js"
import styles from "./styles.module.css"
import { Author } from "../../types/post"

type ProfileCardProps = {
    user: Author
    position: { x: number; y: number }
    onEnter: () => void
    onLeave: () => void
}

export default function ProfileCard(props: ProfileCardProps): JSX.Element {
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
                <button class={styles["follow-button"]}>
                    Follow
                </button>
            </div>
            <div class={styles["text-content"]}>
                <span class={styles["display-name"]}>{props.user.displayName}</span>
                <span class={styles["username"]}>@{props.user.username}</span>
                <span class={styles["bio-text"]}>
                    FBI Special Agent 🍩 Coffee connoisseur ☕️ Dreams, owls &
                    mysteries 🦉 “Damn fine cup of coffee” kind of guy. 
                    Reporting live from Twin Peaks.
                </span>
                <div class={styles["following-details"]}>
                    <span class={styles["following-details-count"]}>3</span>
                    <span class={styles["following-details-text"]}>Following</span>
                    
                    <span class={styles["following-details-count"]}>5</span>
                    <span class={styles["following-details-text"]}>Followers</span>
                </div>
            </div>
        </div>
    )
}
