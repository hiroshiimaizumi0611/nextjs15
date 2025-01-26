"use server"

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

type State = {
    error?: string | undefined;
    success: boolean
}

export const addPostAction = async (prevState: State, formData: FormData): Promise<State> => {

    try {
        const { userId } = auth();
        if (!userId) {
            console.log('userId is null')
            return { error: "ユーザーが存在しません。", success: false };
        }

        const postText = formData.get("post") as string
        const postTextSchema = z.string().min(1, '入力OK？').max(140, '140字以内')
        const validatedPostText = postTextSchema.parse(postText)

        await prisma.post.create({
            data: {
                content: validatedPostText,
                authorId: userId,
            }
        })

        revalidatePath("/")

        return {
            error: undefined,
            success: true
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                error: error.errors.map((e) => e.message).join(", "),
                success: false
            }
        } else if (error instanceof Error) {
            return {
                error: error.message,
                success: false
            }
        } else {
            return {
                error: '予期せぬエラー',
                success: false
            }
        }
    }
}

export const likeAction = async (
    formData: FormData
) => {
    const { userId } = auth();

    if (!userId) {
        return { likes: [], error: "User is not authenticated" };
    }

    const postId = formData.get("postId") as string;
    console.log('postId = ' , postId)

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                postId,
                userId,
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });

            revalidatePath("/");
        } else {
            await prisma.like.create({
                data: {
                    postId,
                    userId,
                },
            });

            revalidatePath("/");
        }
    } catch (err) {
        console.log(err);
    }
};
