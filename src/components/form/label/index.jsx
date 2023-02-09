import "./style.scss"

export default function Label({ name, className, children }) {

    return <label className={"label-" + name + "" + (className ? ` ${className}` : "")} htmlFor={"input-" + name}>{children}</label>
}