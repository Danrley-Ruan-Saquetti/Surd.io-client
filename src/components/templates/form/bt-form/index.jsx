import "./style.css"

export default function BTFormTemplate(props = { type, onClick, btContent }) {

    return (
        <>
            <button type={props.type} onClick={() => props.onClick()}>{props.btContent}</button>
        </>
    )
}