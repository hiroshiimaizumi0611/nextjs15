"use client"

import { Button } from "../ui/button"
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons"
import { useOptimistic } from "react";
import { likeAction } from "@/lib/action";
import { useAuth } from "@clerk/nextjs";
type Props = {
    postId: string;
    initialLikes: string[];
    commentNumber: number;
}

interface LikeState {
    count: number;
    isLiked: boolean;
}

const PostInteraction = ({postId, initialLikes, commentNumber }: Props) => {

    const { userId } = useAuth();

    const initialState: LikeState = {
        count: initialLikes.length,
        isLiked: userId ? initialLikes.includes(userId) : false,
    };

    const [optimisticLike, addOptimisticLike] = useOptimistic<LikeState, void>(
        initialState,
        (currentState) => ({
            count: currentState.isLiked
                ? currentState.count - 1
                : currentState.count + 1,
            isLiked: !currentState.isLiked,
        })
    );

    const handleLikeSubmit = async (formData: FormData) => {
        addOptimisticLike();

        try {
            await likeAction(formData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center">
            <form action={handleLikeSubmit}>
            <input type="hidden" name="postId" value={postId} />
                <Button variant="ghost" size="icon">
                    <HeartIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <span className="-ml-1">{optimisticLike.count}</span>
                <Button variant="ghost" size="icon">
                    <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <span className="-ml-1">{commentNumber}</span>
                <Button variant="ghost" size="icon">
                    <Share2Icon className="h-5 w-5 text-muted-foreground" />
                </Button>
            </form>

        </div>
    )
}

export default PostInteraction