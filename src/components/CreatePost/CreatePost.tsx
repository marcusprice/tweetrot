import { createSignal, JSX, Show } from "solid-js"
import styles from "./styles.module.css"
import { PostType } from "../../types/post"
import { createPost } from "../../dao/post"
import { user } from "../../store/user"

type CreatePostProps = {
    onPost: (post: PostType) => void
}

export function CreatePost(props: CreatePostProps): JSX.Element {
    const [postContent, setPostContent] = createSignal("")
    const [imageUploadFile, setImageUploadFile] = createSignal<File | undefined>()
    const [imageUploadPreview, setImageUploadPreview] = createSignal<string | undefined>()
    let fileInput: HTMLInputElement | undefined

    function handleClick(e: MouseEvent) {
        e.preventDefault()

        createPost(postContent(), imageUploadFile())
            .then((post) => {
                props.onPost(post)
                setPostContent("")
                setImageUploadPreview("")
                setImageUploadFile(undefined)
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
        <div class={styles["post-reply"]}>
            <div class={styles["avatar-col"]}>
                <div
                    class={styles["avatar"]}
                    style={`background-image: url('${user()?.avatar}')`}
                >

                </div>
            </div>

            <div class={styles["post-form-container"]}>
                <div class={styles["post-form"]}>
                    <form id="post-reply-form">
                        <input
                            value={postContent()}
                            placeholder="What's happening?"
                            oninput={(e) => setPostContent(e.target.value)}
                            id="post-reply"
                            type="text" 
                        /> 
                    </form>

                </div>
                <div class={styles["file-upload-bar"]}>
                    <Show when={imageUploadPreview()}>
                        <div class={styles["image-preview-container"]}>
                            <img class={styles["image-preview"]} src={imageUploadPreview()}/>
                            <button class={styles["image-upload-cancel"]} onclick={handleCancelImage}>
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </Show>

                    <div>
                        <button class={styles["file-upload-button"]} onclick={handleUploadClick}>
                            <i class="bi bi-image"></i>
                        </button>

                        <button
                            form="post-reply-form"
                            class={styles["reply-button"]}
                            onclick={handleClick}
                            disabled={postContent().length <= 0 && imageUploadFile() === undefined}
                        >
                            Post
                        </button> 
                    </div>

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
