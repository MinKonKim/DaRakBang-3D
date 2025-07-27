type SuccessResponse<T>={
    success:true,
    data: T,
    message? : string
}

type ErrorResponse ={
    success: false,
    error : {
        code : string,
        message: string
    }
}

export type ApiResponse<T> = Promise<SuccessResponse<T> | ErrorResponse>