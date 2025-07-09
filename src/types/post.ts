export type Author = {
    username: string
    displayName: string
    avatar: string
    bio?: string
    followingCount?: number
    followerCount?: number
    viewerFollowing?: boolean
}

export type Retweeter = {
    username: string
    displayName: string
}

export interface CommentType {
    commentID: number
    postID: number
    parentCommentID: number
    content: string
    likeCount: number
    retweetCount: number
    bookmarkCount: number
    impressions: number
    image: string
    createdAt: string
    updatedAt: string
    replies: Array<string>
    author: Author
}

export interface PostType {
    id: number
    content: string
    image: string
    commentCount: number
    likeCount: number
    retweetCount: number
    bookmarkCount: number
    impressions: number
    createdAt: string
    updatedAt: string
    comments: CommentType[]
    viewerLiked: boolean
    viewerRetweeted: boolean
    viewerBookmarked: boolean

    author: Author
    retweeter: Retweeter
}

export interface TimelinePostType extends PostType {
    type: "post" | "post-retweet" | "comment-retweet"
    isRetweet: boolean
    retweeterUsername: string
    retweeterDisplayName: string
    parentPostID: number
    parentPostAuthorUsername: string
    parentCommentID: number
    parentCommentAuthorUsername: string
}

export interface TimelineCommentType extends CommentType {
    isRetweet: number
    retweeterUsername: number
    retweeterDisplayName: number
}
