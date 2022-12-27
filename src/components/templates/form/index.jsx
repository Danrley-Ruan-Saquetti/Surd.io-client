import "./style.css"

export default function FormTemplate(props = { info, inputBoxContent, linkContent, btContent }) {

    return (
        <>
            <form className="t_form" action="" method="POST" onSubmit={(ev) => {
                ev.preventDefault()
            }}>
                <div className="t_form-info">
                    <h1>{props.info}</h1>
                </div>

                <div className="t_form-content-input-box">
                    {props.inputBoxContent}
                </div>

                {props.linkContent ? (<>
                    <div className="t_form-content-link">
                        {props.linkContent}
                    </div>
                </>) : (<></>)}

                <div className="t_form-content-bt-actions">
                    {props.btContent}
                </div>
            </form>
        </>
    )
}