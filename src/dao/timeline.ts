import { StatusCodes } from "../constants/http"
import { GET_TIMELINE_POSTS } from "../constants/routes"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/tokens"
import { InternalServerError } from "../errors/errors"
import { TimelineResponse } from "../types/http-responses"

export function getTimelinePosts(view: string, offset: number): Promise<TimelineResponse> {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const params = new URLSearchParams()
    params.set("view", view)
    params.set("limit", "10")
    params.set("offset", offset.toString())

    const request = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(`${GET_TIMELINE_POSTS}?${params.toString()}`, request)
        .then((response) => {
            if (response.status == StatusCodes.OK) {
                return response.json()
            }

            response.text().then((body) => {
                console.error(
                    `fetch failed - status code: ${response.status} * response body ${body}`
                )
            })

            throw new InternalServerError()
        })
        .then((json) => {
            const timelineData = json as TimelineResponse
            return timelineData
        })
}
