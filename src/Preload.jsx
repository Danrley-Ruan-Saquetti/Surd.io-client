import ControlRouters from "./util/control-routers.js"

export default function Preload({ children }) {
    const [] = ControlRouters()

    return (
        <>
            {children}
        </>
    )
}