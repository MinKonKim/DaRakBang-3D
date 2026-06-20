import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { SceneObject } from "@/shared/types"
import { ICommand } from "../command-manager"

/**
 * 오브젝트 씬 제거 커맨드
 * - execute: 오브젝트를 씬에서 제거 (Storage 파일은 유지)
 * - undo: 제거된 오브젝트를 원래 id로 복원
 */
export class RemoveObjectCommand implements ICommand {
  constructor(private obj: SceneObject) {}

  execute() {
    useObjectStore.getState().deleteObject(this.obj.id)
  }

  undo() {
    useObjectStore.getState().restoreObject(this.obj)
  }
}
