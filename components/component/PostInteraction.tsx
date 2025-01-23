import { Button } from "../ui/button"
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons"
type Props = {
    postId: string;
    initialLikes: string[];
    commentNumber: number;
}

const PostInteraction = ({ postId, initialLikes, commentNumber }: Props) => {
    return (
        <div className="flex items-center">
            <Button variant="ghost" size="icon">
                <HeartIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
            <span className="-ml-1">{initialLikes?.length || 0}</span>
            <Button variant="ghost" size="icon">
                <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
            <span className="-ml-1">{commentNumber || 0}</span>
            <Button variant="ghost" size="icon">
                <Share2Icon className="h-5 w-5 text-muted-foreground" />
            </Button>

        </div>
    )
}

export default PostInteraction