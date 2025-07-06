import { createSignal, Show } from "solid-js"
import styles from "./styles.module.css"
import { TimelinePostType } from "../../types/post"
import { A } from "@solidjs/router"
import { timeSince } from "../../utils/utils"
import { bookmarkPost, likePost, retweetPost } from "../../dao/post"

type PostProps = {
    post: TimelinePostType
}

export default function TimelinePost(props: PostProps) {
    const [liked, setLiked] = createSignal(props.post.viewerLiked)
    const [likeCount, setLikeCount] = createSignal(props.post.likeCount)
    const [retweeted, setRetweeted] = createSignal(props.post.viewerRetweeted)
    const [retweetCount, setRetweetCount] = createSignal(props.post.retweetCount)
    const [bookmarked, setBookmarked] = createSignal(props.post.viewerBookmarked)

    function handleLike(e: MouseEvent, isLiked: boolean) {
        e.preventDefault()
        const method = isLiked ? "DELETE" : "PUT"

        if (props.post.type !== "comment-retweet") {
            likePost(props.post.id, method).then(() => {
                setLiked((prev) => !prev)
                if (method === "PUT") {
                    setLikeCount((prev) => prev + 1)
                } else {
                    setLikeCount((prev) => prev - 1)
                }
            })
        }
    }

    function handleRetweet(e: MouseEvent, isRetweeted: boolean) {
        e.preventDefault()
        const method = isRetweeted ? "DELETE" : "PUT"

        if (props.post.type !== "comment-retweet") {
            retweetPost(props.post.id, method).then(() => {
                setRetweeted((prev) => !prev)
                if (method === "PUT") {
                    setRetweetCount((prev) => prev + 1)
                } else {
                    setRetweetCount((prev) => prev - 1)
                }
            })
        }
    }

    function handleBookmark(e: MouseEvent, isBookmarked: boolean) {
        e.preventDefault()
        const method = isBookmarked ? "DELETE" : "PUT"

        if (props.post.type !== "comment-retweet") {
            bookmarkPost(props.post.id, method).then(() => {
                setBookmarked((prev) => !prev)
            })
        }
    }

    // prettier-ignore
    return (
        <div>
            <Show when={props.post.retweeterUsername !== ""}>
                <div class={styles["retweeted-by"]}>
                    <i class="bi bi-repeat"></i>
                    {props.post.retweeter.displayName} retweeted
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
                        <A inactiveClass="post-link" href={`/post/${props.post.id}`}>
                            <Show when={props.post.content}>
                                <Show when={props.post.parentPostID}>
                                    <div>
                                        <span class={styles["reply-to-text"]}>
                                            Replying to&nbsp;
                                            <span class={styles["username-link-text"]}>
                                                @{props.post.parentPostAuthorUsername}
                                            </span>
                                            <Show when={props.post.parentCommentID}>
                                                &nbsp;and 
                                                <span class={styles["username-link-text"]}>
                                                    @{props.post.parentCommentAuthorUsername} 
                                                </span>
                                            </Show>
                                        </span>
                                    </div>
                                </Show>
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
                                    onclick={(e) => handleRetweet(e, retweeted())}
                                    class={styles["postActionButton"]}
                                >
                                    <i
                                        class={`
                                            bi bi-repeat
                                            ${retweeted() ? styles["retweeted"] : ""}
                                        `}></i>
                                </button>
                                {retweetCount()}
                            </span>

                            <span>
                                <button
                                    class={styles["postActionButton"]}
                                    onclick={(e) => handleLike(e, liked())}
                                >
                                    <Show when={liked()}>
                                        <i class={`bi bi-heart-fill ${styles["liked-heart"]}`}></i>
                                    </Show>

                                    <Show when={!liked()}>
                                        <i class="bi bi-heart"></i>
                                    </Show>

                                </button>
                                {likeCount()}
                            </span>

                            <span>
                                <i class="bi bi-bar-chart-fill"></i>
                                {props.post.impressions}
                            </span>

                            <div class={styles["bookmark-share"]}>
                                <button
                                    onclick={(e) => handleBookmark(e, bookmarked())}
                                    class={`
                                    ${styles["postActionButton"]}
                                `}
                                >
                                    <Show when={bookmarked()}>
                                        <i
                                            class={`
                                                bi bi-bookmark-fill 
                                                ${bookmarked() ? styles["bookmarked"] : ""}
                                            `}
                                        ></i>
                                    </Show>

                                    <Show when={!bookmarked()}>
                                        <i class="bi bi-bookmark"></i>
                                    </Show>
                                </button>
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
