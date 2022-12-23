import { useCallback, useState } from "react"
import ControlLocalStorage from "../util/ControlLocalStorage"

const controlLocalStorage = ControlLocalStorage()

export default function useLocalStorage(key, initialValue = "") {
    const [state, setState] = useState(() => {
        try {
            return controlLocalStorage.getItem(key)
        } catch (err) {
            return initialValue
        }
    })

    const setValue = useCallback(value => {
        try {
            controlLocalStorage.createItem(value)
            setState(value)
        } catch (err) {
            return false
        }
    })

    return [state, setValue]
}