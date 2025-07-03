import { JSX, For, Show, createResource } from "solid-js"
import { useParams } from "@solidjs/router"
import { fetchPost } from "../../dao/post"
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

    function handleCommentReply(newComment: CommentType) {
        const currentPost: PostType = postData()!
        const newPost: PostType = {
            ...currentPost,
            comments: [newComment, ...currentPost.comments],
        }
        mutate(newPost)
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
                                    <i class="bi bi-repeat"></i>
                                    {postData()?.retweetCount}
                                </span>

                                <span>
                                    <i class="bi bi-heart"></i>
                                    {postData()?.likeCount}
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
