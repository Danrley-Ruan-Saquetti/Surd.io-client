import { useEffect } from "react"
import { socket } from "../services/socket"
import useAuthenticate from "./useAuthenticate"

export default function UseEventsCurrentUser({ observer = () => { return }, events = [
    "$/users/current/update",
    "$/users/current/update/serverConnected"
], options = {} }) {
    const [] = useAuthenticate(observer)

    useEffect(() => {
        events.forEach(ev => {
            socket.on(ev, observer)
        })

        observer()

        return () => {
            events.forEach(ev => {
                socket.off(ev, observer)
            })
        }
    }, [])

    return []
}