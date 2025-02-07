'use client'

import { followAction } from "@/lib/action"
import { Button } from "../ui/button"
import { useOptimistic } from "react"

interface Props {
    isCurrentUser: boolean
    isFollowing: boolean
    userId: string
}

const FollowButton = ({ isCurrentUser, isFollowing, userId }: Props) => {

    const [optimisticFollow, addOptimisticFollow] = useOptimistic<{ isFollowing: boolean }, void>({
        isFollowing
    }, (currentState) => ({
        isFollowing: !currentState.isFollowing
    }))

    const getButtonContent = () => {
        if (isCurrentUser) {
            return "プロフィール編集"
        }

        if (optimisticFollow.isFollowing) {
            return "フォロー中"
        }

        return "フォローする"
    }

    const getButtonVariant = () => {
        if (isCurrentUser) {
            return "secondary"
        }

        if (optimisticFollow.isFollowing) {
            return "outline"
        }

        return "default"

    }

    const handleFollowAction = async () => {
        if (isCurrentUser) {
            return;
        }

        try {
            addOptimisticFollow()
            await followAction(userId)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <form action={handleFollowAction}>
            <Button variant={getButtonVariant()} className="w-full">{getButtonContent()}</Button>
        </form>
    )
}

export default FollowButton