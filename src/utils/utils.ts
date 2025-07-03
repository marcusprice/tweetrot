export function timeSince(utcTimestamp: string): string {
    const now = new Date()
    const then = new Date(utcTimestamp)
    const diffMs = now.getTime() - then.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays >= 1) {
        const optionsSameYear: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
        }
        const optionsDifferentYear: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
        const useOptions =
            now.getFullYear() === then.getFullYear() ? optionsSameYear : optionsDifferentYear

        return then.toLocaleDateString(undefined, useOptions)
    } else if (diffHours >= 1) {
        return `${diffHours}h`
    } else if (diffMins >= 1) {
        return `${diffMins}m`
    } else {
        return "Just now"
    }
}
