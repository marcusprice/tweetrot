import { createSignal, JSX } from "solid-js"
import styles from "./styles.module.css"
import { CommentType } from "../../types/post"
import { postComment } from "../../dao/comment"

type CommentReplyProps = {
    userAvatar: string
    postID: number
    parentCommentID?: number
    onReply: (comment: CommentType) => void
}

export function CommentReply(props: CommentReplyProps): JSX.Element {
    const [commentReply, setCommentReply] = createSignal("")

    function handleClick(e: MouseEvent) {
        e.preventDefault()

        postComment(commentReply(), props.postID, props.parentCommentID)
            .then((newComment) => {
                newComment.replies = []
                props.onReply(newComment)
                setCommentReply("")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    // prettier-ignore
    return (
        <div class={styles["comment-reply"]}>
            <div class={styles["avatar-col"]}>

                <div
                    class={styles["avatar"]}
                    style={`background-image: url('${props.userAvatar}')`}
                >

                </div>
            </div>

            <div class={styles["comment-form-container"]}>
                <form>
                    <label for="comment-reply">
                    </label>
                    <input
                        value={commentReply()}
                        placeholder="Post your reply"
                        oninput={(e) => setCommentReply(e.target.value)}
                        id="comment-reply"
                        type="text" 
                    /> 
                </form>

                <button
                    class={styles["reply-button"]}
                    onclick={handleClick}
                    disabled={commentReply().length <= 0}
                >
                    Reply
                </button>
            </div>
        </div>
    )
}
