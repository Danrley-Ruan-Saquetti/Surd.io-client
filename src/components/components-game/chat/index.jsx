import { useState } from "react";
import Chat from "../../chat";
import Icon from "../../templates/icon";
import ToolTip from "../../templates/tooltip"
import "./style.css"

export default function ChatGame() {
    const [isMaximized, setIsMaximized] = useState(true)

    const toggleChat = (value) => {
        setIsMaximized(value)
    }

    return (
        <>
            <div className={"chat chat-game-content " + (isMaximized ? "maximized" : "minimized")}>
                {isMaximized
                    ? (<>
                        <ToolTip
                            className="minimize-chat"
                            content={(<>
                                <Icon
                                    className=""
                                    name="minimize"
                                />
                            </>)}
                            direction="top"
                            tooltipMsg="Minimize chat"
                            onClick={() => toggleChat(false)}
                        />
                        <Chat />
                    </>)
                    : (<>
                        <ToolTip
                            className="minimize-chat"
                            content={(<>
                                <Icon
                                    className=""
                                    name="minimize"
                                />
                            </>)}
                            direction="top"
                            tooltipMsg="Minimize chat"
                            onClick={() => toggleChat(true)}
                        />
                    </>)}
            </div>
        </>
    )
}