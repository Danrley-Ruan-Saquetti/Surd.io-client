export default function BTFormTemplate(props = { type, onClick, btContent }) {

    return (
        <>
            <button className="bt" type={props.type} onClick={() => props.onClick()}>{props.btContent}</button>
        </>
    )
}