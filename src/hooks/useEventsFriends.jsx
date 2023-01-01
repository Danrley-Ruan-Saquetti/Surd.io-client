import { useEffect } from "react"
import { socket } from "../services/socket"
import useAuthenticate from "./useAuthenticate"

export default function UseEventsFriends({ observer = () => { return }, events = [
    "$/friends/send-invite",
    "$/friends/denied-invite",
    "$/friends/accept-invite",
    "$/friends/remove-friendship",
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