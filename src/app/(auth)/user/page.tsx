"use client"
import { Button } from "@/components/ui";
import {  UserInsertType } from "@/modules/users/type";
import { usersInstance } from "@/shared/lib/axios";

export default function UserPage(){

    const mockUser : UserInsertType = {
        id: 1,
        name :"홍길동",
    }
    const handleGetUserButtonClick =async()=>{
        const response = await usersInstance.get("/1")
    }

    const handleInsertUserButtonClick =async()=>{
        const response  = await usersInstance.post("/1",mockUser)
            
    }

    return (
        <div className="size-full flex items-center justify-center">
            <Button onClick={handleInsertUserButtonClick}>회원추가</Button>
            <Button onClick={handleGetUserButtonClick}>회원조회</Button>
        </div>
    )
}