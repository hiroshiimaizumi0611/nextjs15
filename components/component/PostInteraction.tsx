import { prisma } from "@/lib/prisma";
import { Button } from "../ui/button"
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons"
import { auth } from "@clerk/nextjs/server";
type Props = {
    postId: string;
    initialLikes: string[];
    commentNumber: number;
}

const PostInteraction = ({ postId, initialLikes, commentNumber }: Props) => {

    const likeAction = async () => {
        "use server";
        const { userId } = auth()
        if (!userId) {
            throw new Error("User is not authenticated.")
        }

        try {
            const existingLike = await prisma.like.findFirst({
                where: {
                    postId,
                    userId
                }
            })
            if (existingLike) {
                await prisma.like.delete({
                    where: {
                        id: existingLike.id
                    }
                })
            } else {
                await prisma.like.create({
                    data: {
                        postId, userId
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex items-center">
            <form action={likeAction}>
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
            </form>

        </div>
    )
}

export default PostInteraction