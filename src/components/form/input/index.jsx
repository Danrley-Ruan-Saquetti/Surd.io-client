import "./style.css"

export default function Input({ className = "", name, type, value, onChange, isRequired }) {

    if (isRequired) { return <input className={"form-input " + className} id={`input-${name}`} onChange={onChange} type={type} name={name} value={value} required="required" /> }

    return <input className={"form-input " + className} id={`input-${name}`} onChange={onChange} type={type} name={name} value={value} />
}