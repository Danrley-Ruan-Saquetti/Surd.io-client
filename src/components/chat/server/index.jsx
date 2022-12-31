import useListPosts from "../../../hooks/useListPosts"
import Chat from "../../templates/chat"

export default function ChatServer() {
    const [posts] = useListPosts()

    return (
        <>
            <Chat
                isServer={true}
                posts={posts}
            />
        </>
    )
}