import { useEffect } from "react"
import { socket } from "../services/socket"
import useAuthenticate from "./useAuthenticate"

export default function UseEvents({
    observer = () => { return },
    events = [{ ev: "", observer: () => {} }],
    options = {
        $uniqueObserver: false,
        $alreadyExecuteObserver: true,
        $useAuthenticate: true
    }
}) {

    if (typeof options.$uniqueObserver === "undefined") {
        options.$uniqueObserver = false
    }
    if (typeof options.$alreadyExecuteObserver === "undefined") {
        options.$alreadyExecuteObserver = true
    }
    if (typeof options.$useAuthenticate === "undefined") {
        options.$useAuthenticate = true
    }

    const [] = useAuthenticate(() => {
        if (!options.$useAuthenticate) { return }
        observer()
    })

    useEffect(() => {
        events.forEach((ev) => {
            socket.on(ev.ev, options.$uniqueObserver ? observer : ev.observer)

            !options.$uniqueObserver && ev.observer()
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