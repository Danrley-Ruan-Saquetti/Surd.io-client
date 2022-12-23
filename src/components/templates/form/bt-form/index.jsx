import "./style.css"

export default function BTForm(props) {

    return (
        <>
            <button type={props.type} onClick={() => props.onClick()}>{props.btContent}</button>
        </>
    )
}