import Item from "./item"
import "./style.css"

export default function SideBar(props = { actionFunction: (action = "") => { } }) {
    const itens = [
        { content: "Home", name: "home", action: "home" },
        { content: "Profile", name: "account_circle", action: "profile" },
        { content: "Game", name: "sports_esports", action: "game" },
        { content: "Users", name: "group", action: "user" },
        { content: "Shop", name: "store", action: "shop" },
        { content: "Settings", name: "settings", action: "setting" }
    ]

    return (
        <>
            <div className="side-bar">
                {itens.map((item, i) => {
                    return <Item key={i}
                        content={item.content}
                        name={item.name}
                        action={item.action}
                        actionFunction={props.actionFunction}
                    />
                })}
            </div>
        </>
    )
}