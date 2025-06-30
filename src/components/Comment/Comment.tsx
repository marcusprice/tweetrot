import { CommentType } from "../../types/post"
import styles from "./styles.module.css"
import { Show } from "solid-js"

type CommentProps = {
    comment: CommentType
}

export default function Comment(props: CommentProps) {
    return (
        <div class={styles["comment-container"]}>
            <div class={styles["avatar-col"]}>
                <div
                    class={styles["avatar"]}
                    style={`background-image: url('${props.comment.author.avatar}')`}
                ></div>
            </div>

            <div class={styles["comment"]}>
                <div class={styles["user-names"]}>
                    <span class={styles["display-name"]}>{props.comment.author.displayName}</span>
                    <span class={styles["username"]}>@{props.comment.author.username}</span>
                </div>

                <div class={styles["comment-content-container"]}>
                    <Show when={props.comment.content}>
                        <span class={styles["comment-content"]}>{props.comment.content}</span>
                    </Show>

                    <Show when={props.comment.image}>
                        <img
                            class={styles["comment-image"]}
                            src={props.comment.image}
                            onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                    </Show>

                    <div class={styles["comment-engagement"]}>
                        <span>
                            <i class="bi bi-chat"></i>
                            {props.comment.replies.length || 0}
                        </span>

                        <span>
                            <i class="bi bi-repeat"></i>
                            {props.comment.retweetCount}
                        </span>

                        <span>
                            <i class="bi bi-heart"></i>
                            {props.comment.likeCount}
                        </span>

                        <span>
                            <i class="bi bi-bar-chart-fill"></i>
                            {props.comment.impressions}
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
