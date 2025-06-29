import { Post } from "./post"

export type TimelineResponse = {
    hasMore: boolean
    posts: Post[]
    postsRemaining: number
}
