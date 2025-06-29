import { For, onMount, createMemo, createResource, createSignal } from "solid-js"
import { getTimelinePosts } from "../../dao/timeline"
import { TimelinePostType } from "../../types/post"
import TimelinePost from "../../components/TimelinePost/TimelinePost"

export default function Timeline() {
    const [posts, setPosts] = createSignal<TimelinePostType[]>([])
    const [offset, setOffset] = createSignal(0)
    const [hasMore, setHasMore] = createSignal(true)

    const fetchOffset = createMemo(() => {
        return hasMore() ? offset() : undefined
    })

    function handleClick(e: MouseEvent) {
        e.preventDefault()
        setOffset((prev) => prev + 10)
    }

    const [timeline] = createResource(fetchOffset, (offset) => {
        getTimelinePosts(offset).then((result) => {
            setPosts((prev) => [...prev, ...result.posts])
            setHasMore(result.hasMore)
            return result
        })
    })

    onMount(() => {
        // Always reset on new mount
        setPosts([])
        setHasMore(true)
        setOffset(0) // triggers createResource if fetchOffset changes
    })

    // prettier-ignore
    return (
        <div>
            <For each={posts()}>
                {(item: TimelinePostType) => <TimelinePost post={item}/>}
            </For>

            <button
                disabled={!hasMore() || timeline.loading}
                onclick={handleClick}
            >
                Load more
            </button>
        </div>
    )
}
