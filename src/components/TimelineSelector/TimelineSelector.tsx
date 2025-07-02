import { createSignal, JSX, Show } from "solid-js"
import styles from "./styles.module.css"
import { FOLLOWING, FOR_YOU } from "../../constants/timeline"

type TimelineSelectorProps = {
    onSelect: (timeline: number) => void
}

export default function TimelineSelector(props: TimelineSelectorProps): JSX.Element {
    const [selected, setSelected] = createSignal(FOR_YOU)

    function handleSelect(e: MouseEvent, timeline: number) {
        e.preventDefault()
        setSelected(timeline)
        props.onSelect(timeline)
    }

    // prettier-ignore
    return (
        <div class={styles["timeline-selector-container"]}>
            <button onclick={(e) => handleSelect(e, FOR_YOU)}>
                <div class={styles["inner-button"]}>
                    <span class={styles["button-text"]}>
                        For you
                    </span>
                    <div
                        class={`${styles["underline"]} ${selected() == FOR_YOU ? styles["selected"] : ""}`}
                    >
                    </div>
                </div>
            </button>

            <button onclick={(e) => handleSelect(e, FOLLOWING)}>
                <div class={styles["inner-button"]}>
                    <span class={styles["button-text"]}>
                        Following
                    </span>
                    <div
                        class={`${styles["underline"]} ${selected() == FOLLOWING ? styles["selected"] : ""}`}
                    >
                    </div>
                </div>
            </button>
        </div>
    )
}
