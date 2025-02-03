import { Button } from "../ui/button"

interface Props {
    isCurrentUser: boolean
    isFollowing: boolean
}

const FollowButton = ({ isCurrentUser, isFollowing }: Props) => {

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
        <div>
            <Button variant={getButtonVariant()} className="w-full">{getButtonContent()}</Button>
        </div>
    )
}

export default FollowButton