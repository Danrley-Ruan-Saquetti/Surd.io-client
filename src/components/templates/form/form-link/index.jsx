import "./style.css"

export default function FormLinkTemplate(props = { linkUrl, linkContent }) {

    return (
        <>
            <a href="" onClick={(ev) => {
                ev.preventDefault()
                props.linkUrl()
            }}>{props.linkContent}</a>
        </>
    )
}