import { Show } from "solid-js"
import styles from "./styles.module.css"
import { PostType } from "../../types/post"
import { A } from "@solidjs/router"
import { timeSince } from "../../utils/utils"

type PostProps = {
    post: PostType
}

export default function TimelinePost(props: PostProps) {
    return (
        <div class={styles["timeline-post"]}>
            <div class={styles["avatar-col"]}>
                <div
                    class={styles["avatar"]}
                    style={`background-image: url('${props.post.author.avatar}')`}
                ></div>
            </div>

            <div class={styles["post"]}>
                <div class={styles["user-names"]}>
                    <span class={styles["display-name"]}>{props.post.author.displayName}</span>
                    <span class={styles["additional-text"]}>@{props.post.author.username}</span>
                    <span class={styles["additional-text"]}>•</span>
                    <span class={styles["additional-text"]}>{timeSince(props.post.createdAt)}</span>
                </div>

                <div class={styles["post-content-container"]}>
                    <A inactiveClass="post-link" href={`/post/${props.post.postID}`}>
                        <Show when={props.post.content}>
                            <span class={styles["post-content"]}>{props.post.content}</span>
                        </Show>

                        <Show when={props.post.image}>
                            <img
                                class={styles["post-image"]}
                                src={props.post.image}
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        </Show>
                    </A>

                    <div class={styles["post-engagement"]}>
                        <span>
                            <i class="bi bi-chat"></i>
                            {props.post.commentCount}
                        </span>

                        <span>
                            <i class="bi bi-repeat"></i>
                            {props.post.retweetCount}
                        </span>

                        <span>
                            <i class="bi bi-heart"></i>
                            {props.post.likeCount}
                        </span>

                        <span>
                            <i class="bi bi-bar-chart-fill"></i>
                            {props.post.impressions}
                        </span>

                        <div class={styles["bookmark-share"]}>
                            <i class="bi bi-bookmark"></i>
                            <i class="bi bi-share"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
