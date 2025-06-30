import { createSignal, JSX, Show } from "solid-js"
import styles from "./styles.module.css"
import { CommentType } from "../../types/post"
import { postComment, PostCommentOptions } from "../../dao/comment"

type CommentReplyProps = {
    userAvatar: string
    postID: number
    parentCommentID?: number
    onReply: (comment: CommentType) => void
}

export function CommentReply(props: CommentReplyProps): JSX.Element {
    const [commentReply, setCommentReply] = createSignal("")
    const [inputToggled, toggleInput] = createSignal(false)
    const [imageUploadFile, setImageUploadFile] = createSignal<File | undefined>()
    const [imageUploadPreview, setImageUploadPreview] = createSignal<string | undefined>()
    let fileInput: HTMLInputElement | undefined

    function handleClick(e: MouseEvent) {
        e.preventDefault()

        const options: PostCommentOptions = {
            postID: props.postID,
            content: commentReply(),
            image: imageUploadFile(),
        }

        postComment(options)
            .then((newComment) => {
                newComment.replies = []
                props.onReply(newComment)
                setCommentReply("")
                setImageUploadPreview("")
                setImageUploadFile(undefined)
                toggleInput(false)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    function handleUploadClick(e: MouseEvent) {
        e.preventDefault()
        fileInput?.click()
    }

    function handleFileSelected(e: Event) {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            setImageUploadPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        setImageUploadFile(file)
    }

    function handleCancelImage(e: MouseEvent) {
        e.preventDefault()
        setImageUploadPreview("")
        setImageUploadFile(undefined)
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
                <div class={styles["comment-form"]}>
                    <form id="comment-reply-form">
                        <input
                            value={commentReply()}
                            placeholder="Post your reply"
                            oninput={(e) => setCommentReply(e.target.value)}
                            onfocus={() => toggleInput(true)}
                            id="comment-reply"
                            type="text" 
                        /> 
                    </form>

                    <button
                        form="comment-reply-form"
                        class={styles["reply-button"]}
                        onclick={handleClick}
                        disabled={commentReply().length <= 0 && imageUploadFile() === undefined}
                    >
                        Reply
                    </button>
                </div>
                <div class={styles["file-upload-bar"]} style={`display: ${inputToggled() ? "block" : "none"}`}>
                    <Show when={imageUploadPreview()}>
                        <div class={styles["image-preview-container"]}>
                            <img class={styles["image-preview"]} src={imageUploadPreview()}/>
                            <button class={styles["image-upload-cancel"]} onclick={handleCancelImage}>
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </Show>
                    <button class={styles["file-upload-button"]} onclick={handleUploadClick}>
                        <i class="bi bi-image"></i>
                    </button>

                    <input
                        type="file"
                        style="display: none"
                        ref={fileInput}
                        onchange={handleFileSelected}
                    />
                </div>
            </div>
        </div>
    )
}
