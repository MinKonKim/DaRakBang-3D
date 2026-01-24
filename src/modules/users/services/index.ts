import { createClient } from "@/shared/lib/supabase";
import { UserDto, UserInsertType } from "../type";
import { ApiResponse } from "@/shared/types/api";

/** 유저 정보 리스트 가져오기  */
export const getUserList =async(): ApiResponse<UserDto[]> =>{
  const supabase = await createClient()
  const {data : userList , error} = await supabase.from("user").select("*")
  if(error){
    return {
      success: false,
      error:{
        code : error.code,
        message: error.message,
      },
    }
  }
  return {
    success:true,
    data : userList,
    message:"유저 목록 조회 성공",
  }
}

/** 유저 정보 입력  */

export const insertUser = async(user:UserInsertType): ApiResponse<null>=>{
  const supabase = await createClient()
  const {error}=await supabase.from("user").insert(user)
  if(error){
    return {
      success: false,
      error:{
        code : error.code,
        message : error.message,
      },
    }
  }

  return {
    success: true,
    data :null,
  }
}
