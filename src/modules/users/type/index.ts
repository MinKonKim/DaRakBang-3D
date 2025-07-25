import { Database } from "@/shared/types";

type UserTable = Database["public"]["Tables"]["user"]

export type UserDto = UserTable["Row"]

export type UserInsertType = UserTable["Insert"]

export type UserUpdateType = UserTable["Update"]