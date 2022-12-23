import "./style.css"

export default function InputBox(props) {

    return (
        <>
            <div className="template-input-box">
                <input onChange={(ev) => props.handleData(ev.target)} type={props.type} name={props.name} id={`${props.name}-input`} required="required" value={props.value} />
                <label htmlFor={props.name}>{props.label}</label>
                <i></i>
            </div>
        </>
    )
}