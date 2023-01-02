import { useEffect } from "react"
import { socket } from "../services/socket"
import useAuthenticate from "./useAuthenticate"

export default function UseEvents({ observer = () => { return }, events = [{ ev: "", observer: () => { } }], options = {
    $uniqueObserver: false
} }) {
    const [] = useAuthenticate(observer)

    useEffect(() => {
        events.forEach((ev) => {
            socket.on(ev.ev, options.$uniqueObserver ? observer : ev.observer)
            !options.$uniqueObserver && ev.observer()
        })

        options.$uniqueObserver && observer()

        return () => {
            events.forEach(ev => {
                socket.off(ev.ev, options.$uniqueObserver ? observer : ev.observer)
            })
        }
    }, [])

    return []
}