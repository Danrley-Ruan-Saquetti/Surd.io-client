import { useEffect } from "react"
import { socket } from "../services/socket"
import useAuthenticate from "./useAuthenticate"

export default function UseEventsInvitesDenied({ observer = () => { return }, events = [
    "$/friends/denied-invite",
    "$/friends/cancel-invite",
    "$/friends/connected",
    "$/friends/disconnected"
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