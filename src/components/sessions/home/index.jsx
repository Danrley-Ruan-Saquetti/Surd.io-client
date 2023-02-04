import Header from "../../header";
import Logo from "../../logo";
import Level from "../../user-info/level";
import Username from "../../user-info/username";
import ProfileInfo from "../../profile-info";
import UserInfo from "../../user-info";
import "./style.css"
import { useContext } from "react";
import { UserContext } from "../../../Contexts/User";

export default function HomeSession() {
    const { user } = useContext(UserContext)

    return (
        <>
            <Header>
                <Logo>
                    <h1>Surd.io Online</h1>
                </Logo>

                <ProfileInfo>
                    <UserInfo>
                        <Level><span>{user.level}</span></Level>
                        <Username><span>{user.username}</span></Username>
                    </UserInfo>
                </ProfileInfo>
            </Header>
        </>
    )
}
