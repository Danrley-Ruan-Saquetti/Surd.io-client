export default function ControlLocalStorage() {
    const createItem = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
            return true
        } catch (err) {
            return false
        }
    }

    const updateItem = (key, value) => {
        try {
            removeItem(key)
            createItem(key, value)
            return true
        } catch (err) {
            return false
        }
    }

    const removeItem = (key) => {
        try {
            localStorage.removeItem(key)
            return true
        } catch (err) {
            return false
        }
    }

    const getItem = (key) => {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (err) {
            return null
        }
    }

    return {
        createItem,
        updateItem,
        removeItem,
        getItem,
    }
}
