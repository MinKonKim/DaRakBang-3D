import { getUserList, insertUser } from "@/modules/users/services";
import { UserInsertType } from "@/modules/users/type";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { NextRequest, NextResponse } from "next/server";

// 컨텍스트(context) 객체 타입을 명시적으로 정의하면 좋습니다.
interface RouteContext {
  params: {
    userId: string;
  };
}

export const GET = async()=>{
  const response = await getUserList()
  return NextResponse.json(response);
}


export const POST=async(req: Request)=> {
  const body: UserInsertType = await req.json()
  const response = await insertUser(body)
  return NextResponse.json(response)
}
/**
 * 특정 사용자 정보를 조회하는 API (GET)
 * @route GET /api/users/{userId}
 */
// export async function GET(req: NextRequest, context: RouteContext) {
//   try {
//     // 1. 동적 경로(dynamic route)에서 userId를 추출합니다.
//     const { userId } = context.params;

//     // 2. 서비스 함수를 호출하여 데이터베이스에서 사용자를 조회합니다.
//     const user = await getUserById(userId);

//     // 3. 사용자가 존재하지 않을 경우, 404 Not Found 응답을 반환합니다.
//     if (!user) {
//       return NextResponse.json(
//         { message: "사용자를 찾을 수 없습니다." },
//         { status: 404 }
//       );
//     }

//     // 4. 성공 시, 사용자 데이터와 200 OK 상태 코드를 반환합니다.
//     return NextResponse.json(user, { status: 200 });

//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     return NextResponse.json(
//       { message: "서버 오류가 발생했습니다." },
//       { status: 500 }
//     );
//   }
// }

/**
 * 특정 사용자 정보를 수정하는 API (PUT)
 * @route PUT /api/users/{userId}
 */
// export async function PUT(req: NextRequest, context: RouteContext) {
//   try {
//     // 1. 경로에서 userId를, 요청 본문에서 수정할 데이터를 추출합니다.
//     const { userId } = context.params;
//     const userData: userUpdateType = await req.json();

//     // 2. 서비스 함수를 호출하여 데이터베이스의 사용자 정보를 수정합니다.
//     const updatedUser = await updateUser(userId, userData);

//     // 3. 수정할 사용자가 존재하지 않아 실패한 경우 (서비스 함수에서 null/undefined 반환 시)
//     if (!updatedUser) {
//       return NextResponse.json(
//         { message: "사용자를 찾을 수 없어 수정에 실패했습니다." },
//         { status: 404 }
//       );
//     }

//     // 4. 성공 시, 수정된 사용자 데이터와 200 OK 상태 코드를 반환합니다.
//     return NextResponse.json(updatedUser, { status: 200 });

//   } catch (error) {
//     console.error("Failed to update user:", error);
//     return NextResponse.json(
//       { message: "서버 오류가 발생했습니다." },
//       { status: 500 }
//     );
//   }
// }

/**
 * 특정 사용자를 삭제하는 API (DELETE)
 * @route DELETE /api/users/{userId}
 */
// export async function DELETE(req: NextRequest, context: RouteContext) {
//   try {
//     // 1. 경로에서 삭제할 userId를 추출합니다.
//     const { userId } = context.params;

//     // 2. 서비스 함수를 호출하여 데이터베이스에서 사용자를 삭제합니다.
//     await deleteUser(userId);

//     // 3. 성공적인 삭제 후에는 내용 없이(No Content) 204 상태 코드를 반환하는 것이 표준입니다.
//     //    또는, 성공 메시지와 함께 200 OK를 반환할 수도 있습니다.
//     return new NextResponse(null, { status: 204 });

//   } catch (error) {
//     console.error("Failed to delete user:", error);
//     return NextResponse.json(
//       { message: "서버 오류가 발생했습니다." },
//       { status: 500 }
//     );
//   }
// }
