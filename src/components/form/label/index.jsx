import "./style.css"

export default function Label({ name, className = "", children }) {

    return <label className={"label-" + name + " " + className} htmlFor={"input-" + name}>{children}</label>
}