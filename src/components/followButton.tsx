import axios from "axios";
import { useState } from "react";

type Props = {
    targetUserId: number
    initialIsFollowing: boolean
}

const FollowButton = ({ targetUserId, initialIsFollowing }: Props) => {
    const [ isFollowing, setIsFollowing ] = useState(initialIsFollowing)
    const [ Loading, setLoading ] = useState(false)
    
    const handleFollow = async () => {
        setLoading(true)
        try {
            if(isFollowing) {
                await axios.post(`/follow/${targetUserId}`, {
                    withCredentials: true,
                })
            } else {
                await axios.post(`/follow/${targetUserId}`, null, {
                    withCredentials: true,
                })
            }

            setIsFollowing(!isFollowing)
        } catch (error) {
            console.error("Follow/unfollow error", error);
            alert("Something went wrong");
        } finally {
            setLoading(false)
        }
    }


    return (
        <button onClick={ handleFollow } disabled={ Loading } className={`px-4 py-2 rounded ${
            isFollowing ? "bg-red-600 text-white" : "bg-green-400 text-white"
        }`}> { Loading ? "loading" : isFollowing ? "unfollow" : "follow" } </button>
    )
}

export default FollowButton