import "./style.css"

export default function FormLink(props) {

    return (
        <>
            <a href="" onClick={(ev) => {
                ev.preventDefault()
                props.linkUrl()
            }}>{props.linkContent}</a>
        </>
    )
}