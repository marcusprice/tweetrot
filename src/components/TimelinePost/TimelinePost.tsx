import { createSignal, Show } from "solid-js"
import styles from "./styles.module.css"
import { TimelinePostType } from "../../types/post"
import { A } from "@solidjs/router"
import { timeSince } from "../../utils/utils"
import { likePost } from "../../dao/post"

type PostProps = {
    post: TimelinePostType
}

export default function TimelinePost(props: PostProps) {
    const [liked, setLiked] = createSignal(props.post.liked)
    const [likeCount, setLikeCount] = createSignal(props.post.likeCount)

    function handlePostLike(e: MouseEvent, isLiked: boolean) {
        e.preventDefault()
        const method = isLiked ? "DELETE" : "PUT"

        likePost(props.post.postID, method).then(() => {
            setLiked((prev) => !prev)
            if (method === "PUT") {
                setLikeCount((prev) => prev + 1)
            } else {
                setLikeCount((prev) => prev - 1)
            }
        })
    }

    return (
        <div>
            <Show when={props.post.retweeterUsername !== ""}>
                <div class={styles["retweeted-by"]}>
                    <i class="bi bi-repeat"></i>
                    {props.post.retweeterDisplayName} retweeted
                </div>
            </Show>
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
                        <span class={styles["additional-text"]}>
                            {timeSince(props.post.createdAt)}
                        </span>
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
                                <button
                                    class={`
                                        ${styles["postActionButton"]} 
                                        ${props.post.retweeted ? styles["retweeted"] : ""}
                                    `}
                                >
                                    <i class="bi bi-repeat"></i>
                                </button>
                                {props.post.retweetCount}
                            </span>

                            <span>
                                <Show when={liked()}>
                                    <button
                                        class={styles["postActionButton"]}
                                        onclick={(e) => handlePostLike(e, liked())}
                                    >
                                        <i class={`bi bi-heart-fill ${styles["liked-heart"]}`}></i>
                                    </button>
                                </Show>

                                <Show when={!liked()}>
                                    <button
                                        class={styles["postActionButton"]}
                                        onclick={(e) => handlePostLike(e, liked())}
                                    >
                                        <i class="bi bi-heart"></i>
                                    </button>
                                </Show>
                                {likeCount()}
                            </span>

                            <span>
                                <i class="bi bi-bar-chart-fill"></i>
                                {props.post.impressions}
                            </span>

                            <div class={styles["bookmark-share"]}>
                                <Show when={props.post.bookmarked}>
                                    <button
                                        class={`
                                        ${styles["postActionButton"]}
                                        ${styles["bookmarked"]}
                                    `}
                                    >
                                        <i class="bi bi-bookmark-fill"></i>
                                    </button>
                                </Show>
                                <Show when={!props.post.bookmarked}>
                                    <button class={styles["postActionButton"]}>
                                        <i class="bi bi-bookmark"></i>
                                    </button>
                                </Show>
                                <button class={styles["postActionButton"]}>
                                    <i class="bi bi-share"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
