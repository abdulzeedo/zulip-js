type BaseResponse = {
    msg: string,
    result: "error" | "success",
    code?: string,
}