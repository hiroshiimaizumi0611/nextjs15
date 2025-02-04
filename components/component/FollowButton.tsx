import { followAction } from "@/lib/action"
import { Button } from "../ui/button"

interface Props {
    isCurrentUser: boolean
    isFollowing: boolean
    userId: string
}

const FollowButton = ({ isCurrentUser, isFollowing, userId }: Props) => {

    const getButtonContent = () => {
        if (isCurrentUser) {
            return "プロフィール編集"
        }

        if (isFollowing) {
            return "フォロー中"
        }

        return "フォローする"
    }

    const getButtonVariant = () => {
        if (isCurrentUser) {
            return "secondary"
        }

        if (isFollowing) {
            return "outline"
        }

        return "default"

    }

    return (
        <form action={followAction.bind(null, userId)}>
            <Button variant={getButtonVariant()} className="w-full">{getButtonContent()}</Button>
        </form>
    )
}

export default FollowButton