export type Author = {
    username: string
    displayName: string
    avatar: string
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
    postID: number
    content: string
    image: string
    commentCount: number
    likeCount: number
    retweetCount: number
    bookmarkCount: number
    impressions: number
    createdAt: string
    updatedAt: string
    author: Author
    comments: CommentType[]
    liked: boolean
}

export interface TimelinePostType extends PostType {
    isRetweet: boolean
    retweeterUsername: string
    retweeterDisplayName: string
}

export interface TimelineCommentType extends CommentType {
    isRetweet: number
    retweeterUsername: number
    retweeterDisplayName: number
}
