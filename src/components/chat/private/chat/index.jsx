import Chat from "../../../templates/chat"
import useListPostsPrivate from "./../../../../hooks/useListPostsPrivate.js"

export default function SubChat(props = { idChat: null }) {
    const [posts] = useListPostsPrivate({ idChat: props.idChat })

    return (
        <>
            <Chat
                isServer={false}
                posts={posts}
                idChat={props.idChat}
            />
        </>
    )
}