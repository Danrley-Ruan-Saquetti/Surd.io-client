import { useContext, useState } from "react"
import { UsersContext } from "../../../Contexts/Users"
import { UserContext } from "../../../Contexts/User"
import AbaContent from "../../aba-container"
import Aba from "../../aba-container/aba"
import List from "../../list"
import ListContent from "../../list/content"
import ItemList from "../../list/item"
import UserInfo from "../../user-info"
import Level from "../../user-info/level"
import Username from "../../user-info/username"
import "./style.scss"
import Icon from "../../icon"

export default function PanelUser() {
    const [currentAba, setCurrentAba] = useState("user")
    const { users } = useContext(UsersContext)
    const { user: currentUser } = useContext(UserContext)

    return (
        <>
            <AbaContent>
                <Aba onClick={() => setCurrentAba("user")} className={currentAba == "user" && "active"} name={"user"}>Users Online</Aba>
                <Aba onClick={() => setCurrentAba("friend")} className={currentAba == "friend" && "active"} name={"friend"}>Friends</Aba>
            </AbaContent>
            {currentAba == "user" ? (<>
                <ListContent>
                    <List className={"users"}>
                        {users && users.map(user => {
                            console.log(user);
                            return <ItemList key={user._id} className={user._id == currentUser._id && "active"}>
                                <UserInfo>
                                    <Level><span>{user.level}</span></Level>
                                    <Username><span>{user.username}</span></Username>
                                </UserInfo>

                                {user._id != currentUser._id && (
                                    <div className="user-action props flex">
                                        {user.friend.isFriend ? (<>Friend</>) :
                                            !user.friend.isPending ? (<><Icon className={"props cu-po"}>person_add</Icon></>) : currentUser._id == user.friend.to ? (<>Friend invite</>) : (<>Pending</>)}
                                    </div>
                                )}
                            </ItemList>
                        })}
                    </List>
                </ListContent>
            </>) : (<>

            </>)}
        </>
    )
}