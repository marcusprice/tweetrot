import { For, onMount, createMemo, createResource, createSignal, Show } from "solid-js"
import { getTimelinePosts } from "../../dao/timeline"
import { PostType, TimelinePostType } from "../../types/post"
import TimelinePost from "../../components/TimelinePost/TimelinePost"
import { CreatePost } from "../../components/CreatePost/CreatePost"
import TimelineSelector from "../../components/TimelineSelector/TimelineSelector"
import { FOR_YOU } from "../../constants/timeline"

export default function Timeline() {
    const [posts, setPosts] = createSignal<TimelinePostType[]>([])
    const [hasMore, setHasMore] = createSignal(true)
    const [fetchParams, setFetchParams] = createSignal({ view: FOR_YOU, offset: 0 })

    // const fetchParams = createMemo(() => {
    //     return {
    //         view: view(),
    //         offset: offset(),
    //     }
    // })

    function handleLoadMoreClick(e: MouseEvent) {
        e.preventDefault()
        setFetchParams((prev) => {
            return {
                ...prev,
                offset: prev.offset + 10,
            }
        })
    }

    const [timeline] = createResource(fetchParams, (fetchParams) => {
        getTimelinePosts(fetchParams.view, fetchParams.offset).then((result) => {
            setPosts((prev) => [...prev, ...result.posts])
            setHasMore(result.hasMore)
            return result
        })
    })

    function handleNewPost(post: PostType) {
        const timelinePost: TimelinePostType = {
            ...post,
            isRetweet: false,
            retweeterDisplayName: "",
            retweeterUsername: "",
        }
        setPosts((prev) => [timelinePost, ...prev])
    }

    // onMount(() => {
    //     // Always reset on new mount
    //     setPosts([])
    //     setHasMore(true)
    //     setOffset(0) // triggers createResource if fetchOffset changes
    // })

    function onTimelineSelect(timeline: string) {
        setPosts([])
        setFetchParams({ view: timeline, offset: 0 })
    }

    // prettier-ignore
    return (
        <div>
            <TimelineSelector onSelect={onTimelineSelect}/>

            <CreatePost onPost={handleNewPost}/>

            <For each={posts()}>
                {(item: TimelinePostType) => <TimelinePost post={item}/>}
            </For>

            <Show when={posts().length !== 0}>
                <button
                    disabled={!hasMore()}
                    onclick={handleLoadMoreClick}
                >
                    Load more
                </button>

            </Show>
        </div>
    )
}
