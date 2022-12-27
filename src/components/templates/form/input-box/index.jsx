import "./style.css"

export default function InputBoxTemplate(props = { name, label, handleData, type, value, error }) {

    return (
        <>
            <div className="_t_input-box">
                <div className="t_input-box">
                    <input onChange={(ev) => props.handleData(ev.target)} type={props.type} name={props.name} id={`${props.name}-input`} required="required" value={props.value} />
                    <label htmlFor={props.name}>{props.label}</label>
                    <i></i>
                </div>
                {props.error && (<><span className="input-invalid">{props.error}</span></>)}
            </div>
        </>
    )
}