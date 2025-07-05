import { JSX, For, Show, createResource, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import { fetchPost, likePost } from "../../dao/post"
import { CommentType, PostType } from "../../types/post"
import styles from "./styles.module.css"
import Comment from "../../components/Comment/Comment"
import { CommentReply } from "../../components/CommentReply/CommentReply"
import { user } from "../../store/user"
import { timeSince } from "../../utils/utils"

export function Post(): JSX.Element {
    const params = useParams()
    const [postData, { mutate }] = createResource<PostType, number>(
        () => parseInt(params.id),
        fetchPost
    )
    const [liked, setLiked] = createSignal(false)
    const [likeCount, setLikeCount] = createSignal(0)
    createEffect(() => {
        setLikeCount(postData()?.likeCount!)
        setLiked(postData()?.liked!)
    })

    function handleCommentReply(newComment: CommentType) {
        const currentPost: PostType = postData()!
        const newPost: PostType = {
            ...currentPost,
            comments: [newComment, ...currentPost.comments],
        }
        mutate(newPost)
    }

    function handlePostLike(e: MouseEvent, isLiked: boolean) {
        e.preventDefault()
        const method = isLiked ? "DELETE" : "PUT"

        likePost(postData()?.postID!, method).then(() => {
            setLiked((prev) => !prev)
            if (method === "PUT") {
                setLikeCount((prev) => prev + 1)
            } else {
                setLikeCount((prev) => prev - 1)
            }
        })
    }

    // prettier-ignore
    return (
        <Show when={postData()}>
            <div class={styles["post-page"]}>
                <div class={styles["post-view"]}>
                    <div class={styles["avatar-col"]}>
                        <div
                            class={styles["avatar"]}
                            style={`background-image: url('${postData()?.author.avatar}')`}
                        ></div>
                    </div>

                    <div class={styles["post"]}>
                        <div class={styles["user-names"]}>
                            <span class={styles["display-name"]}>{postData()?.author.displayName}</span>
                            <span class={styles["additional-text"]}>@{postData()?.author.username}</span>
                            <span class={styles["additional-text"]}>•</span>
                            <span class={styles["additional-text"]}>{timeSince(postData()?.createdAt!)}</span>
                        </div>

                        <div class={styles["post-content-container"]}>
                            <Show when={postData()?.content}>
                                <span class={styles["post-content"]}>{postData()?.content}</span>
                            </Show>

                            <Show when={postData()?.image}>
                                <img
                                    class={styles["post-image"]}
                                    src={postData()?.image}
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                            </Show>

                            <div class={styles["post-engagement"]}>
                                <span>
                                    <i class="bi bi-chat"></i>
                                    {postData()?.commentCount}
                                </span>

                                <span>
                                    <button
                                        class={`
                                            ${styles["postActionButton"]} 
                                            ${postData()?.retweeted ? "retweeted" : ""}
                                        `}>
                                        <i class="bi bi-repeat"></i>
                                    </button>

                                    {postData()?.retweetCount}
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
                                    {postData()?.impressions}
                                </span>

                                <div class={styles["bookmark-share"]}>
                                    <i class="bi bi-bookmark"></i>
                                    <i class="bi bi-share"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CommentReply
                    userAvatar={user()?.avatar!}
                    postID={postData()?.postID!}
                    onReply={handleCommentReply}
                />
                <For each={postData()?.comments}>
                    {(comment) => <Comment comment={comment}/>}
                </For>
            </div>
        </Show>
    )
}
