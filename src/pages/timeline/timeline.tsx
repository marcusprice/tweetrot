import { For, onMount, createMemo, createResource, createSignal } from "solid-js"
import { getTimelinePosts } from "../../dao/timeline"
import { PostType, TimelinePostType } from "../../types/post"
import TimelinePost from "../../components/TimelinePost/TimelinePost"
import { CreatePost } from "../../components/CreatePost/CreatePost"
import TimelineSelector from "../../components/TimelineSelector/TimelineSelector"

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

    function handleNewPost(post: PostType) {}

    onMount(() => {
        // Always reset on new mount
        setPosts([])
        setHasMore(true)
        setOffset(0) // triggers createResource if fetchOffset changes
    })

    function onTimelineSelect(timeline: number) {
        console.log(timeline)
    }

    // prettier-ignore
    return (
        <div>
            <TimelineSelector onSelect={onTimelineSelect}/>

            <CreatePost onPost={handleNewPost}/>

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
