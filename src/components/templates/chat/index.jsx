import useListPosts from "../../../hooks/useListPosts.js"

export default function Chat() {
    const [posts] = useListPosts()

    return (
        <>
            <h2>Chat</h2>
            {posts.length != 0 && posts.map(post => {
                return <div key={post._id} className="posts">{post.body}</div>
            })}
        </>
    )
}