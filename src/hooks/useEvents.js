import { useEffect } from "react"
import { socket } from "../services/socket"

export default function UseEvents({
    observer = (data) => { return },
    events = [{ ev: "", observer: () => {} }],
    options = {
        $uniqueObserver: false,
        $alreadyExecuteObserver: true
    }
}) {
    if (typeof options.$uniqueObserver === "undefined") {
        options.$uniqueObserver = false
    }
    if (typeof options.$alreadyExecuteObserver === "undefined") {
        options.$alreadyExecuteObserver = true
    }

    useEffect(() => {
        events.forEach((ev) => {
            socket.on(ev.ev, options.$uniqueObserver ? observer : ev.observer)

            !options.$uniqueObserver && options.$alreadyExecuteObserver && ev.observer()
        })

        options.$uniqueObserver && options.$alreadyExecuteObserver && observer()

        return () => {
            events.forEach(ev => {
                socket.off(ev.ev, options.$uniqueObserver ? observer : ev.observer)
            })
        }
    }, [])

    return []
}