import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { SceneObject } from "@/shared/types"
import { ICommand } from "../command-manager"

/**
 * 오브젝트 씬 추가 커맨드
 * - execute: 오브젝트를 씬에 추가하고 id 저장
 * - undo: 추가된 오브젝트를 씬에서 제거
 */
export class AddObjectCommand implements ICommand {
  private addedId: string = ""

  constructor(private obj: SceneObject) {}

  execute() {
    useObjectStore.getState().restoreObject(this.obj)
    this.addedId = this.obj.id
  }

  undo() {
    if (this.addedId) {
      useObjectStore.getState().deleteObject(this.addedId)
    }
  }
}
