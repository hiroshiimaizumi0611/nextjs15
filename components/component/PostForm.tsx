"use client"

// components/PostForm.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { addPostAction } from "@/lib/action";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const initialState = {
    error: undefined,
    success: false
  }
  const [state, formAction] = useFormState(addPostAction, initialState);

  if (state.success) {
    formRef.current?.reset()
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <form action={formAction} ref={formRef} className="flex items-center flex-1">
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 rounded-full bg-muted px-4 py-2"
            name="post"
          />
          <SubmitButton />
        </form>
      </div>

      {state.error && (
        <p className="text-destructive mt-1 ml-14">{state.error}</p>
      )}
    </div>
  );
}
