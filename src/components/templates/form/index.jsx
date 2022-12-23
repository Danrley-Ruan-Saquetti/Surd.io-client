import "./style.css"

export default function Form(props) {

    return (
        <>
            <form className="template-form" action="" method="POST" onSubmit={(ev) => {
                ev.preventDefault()
            }}>
                <div className="info-temp_form">
                    <h1>{props.info}</h1>
                </div>

                <div className="content-temp_input-box">
                    {props.inputBoxContent}
                </div>

                {props.linkContent ? (<>
                    <div className="content-link-form">
                        {props.linkContent}
                    </div>
                </>) : (<></>)}

                <div className="content-temp_bt-actions">
                    {props.btContent}
                </div>
            </form>
        </>
    )
}