import { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/User";
import Header from "../../header";
import Logo from "../../logo";
import Level from "../../user-info/level";
import Username from "../../user-info/username";
import ProfileInfo from "../../profile-info";
import UserInfo from "../../user-info";
import IndicatorBar from "../../bar/indicator";
import Bar from "../../bar";
import SideBar from "../../side-bar";
import Item from "../../side-bar/item";
import Line from "../../line"
import Icon from "../../icon";
import ControlPanel from "../../control-panel";
import "./style.scss"
import Panel from "../../panel";
import PanelUser from "../../panel/user";
import { UsersProvider } from "../../../Contexts/Users";

export default function HomeSession() {
    const { user } = useContext(UserContext)
    const [currentAction, setCurrentAction] = useState("user")
    const itensSideBar = [
        { content: "Home", name: "home", action: "home" },
        { content: "Profile", name: "account_circle", action: "profile" },
        { content: "Game", name: "sports_esports", action: "game" },
        { content: "Users", name: "group", action: "user" },
        { content: "Shop", name: "store", action: "shop" },
        { content: "Settings", name: "settings", action: "setting" }
    ]

    const togglePanel = (action) => {
        setCurrentAction(action)
    }

    const getComponentPanel = () => {
        switch (currentAction) {
            case "home": return <>home</>
            case "profile": return <>profile</>
            case "shop": return <>shop</>
            case "game": return <>game</>
            case "user": return <>
                <UsersProvider isLobby={true}>
                    <PanelUser />
                </UsersProvider>
            </>
            case "setting": return <>setting</>
        }
        return <></>
    }

    return (
        <>
            <main className="session home">
                <Header>
                    <Logo className="header-child">
                        <h1>Surd.io Online</h1>
                    </Logo>

                    <ProfileInfo className="header-child">
                        <UserInfo className="props flex jc-end fs bg">
                            <Level className="large"><span>{user.level}</span></Level>
                            <Username><span>{user.username}</span></Username>
                        </UserInfo>
                        <Bar>
                            <IndicatorBar id="xp" valueMax={user.xpUpLevel} value={user.xp}></IndicatorBar>
                        </Bar>
                    </ProfileInfo>
                </Header>

                <div className="body-app">
                    <SideBar>
                        <Line />
                        {itensSideBar.map((item, i) => {
                            return <Item onClick={() => togglePanel(item.action)} key={i} className={currentAction == item.action ? "active" : ""}>
                                <Icon className="props fs mg">{item.name}</Icon>
                            </Item>
                        })}
                        <Line />
                    </SideBar>
                    <ControlPanel>
                        <Panel>{getComponentPanel()}</Panel>
                        <Panel>Chat</Panel>
                    </ControlPanel>
                </div>
            </main>
        </>
    )
}
