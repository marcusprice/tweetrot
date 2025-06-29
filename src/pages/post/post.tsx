import { JSX, For, Show, createEffect, createResource } from "solid-js"
import { useParams } from "@solidjs/router"
import { fetchPost } from "../../dao/post"
import { PostType } from "../../types/post"
import styles from "./styles.module.css"
import Comment from "../../components/Comment/Comment"

export function Post(): JSX.Element {
    const params = useParams()
    const [postData] = createResource<PostType, number>(() => parseInt(params.id), fetchPost)

    createEffect(() => {
        console.log(postData())
    })

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
                            <span class={styles["username"]}>@{postData()?.author.username}</span>
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
                <For each={postData()?.comments}>
                    {(comment) => <Comment comment={comment}/>}
                </For>
            </div>

        </Show>
    )
}
