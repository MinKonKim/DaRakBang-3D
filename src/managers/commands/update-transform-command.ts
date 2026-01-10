import { ICommand } from "../command-manager"
import { useObjectStore } from "@/modules/objects/store/use-object-store"

/**
 * 객체의 Transform(위치, 회전, 크기) 변경을 처리하는 커맨드입니다.
 */
export class UpdateTransformCommand implements ICommand {
  constructor(
    private objectId: string,
    private property: "position" | "rotation" | "scale",
    private oldValue: { x: number; y: number; z: number },
    private newValue: { x: number; y: number; z: number },
  ) {}

  execute() {
    useObjectStore.getState().updateObjectTransform(this.objectId, {
      [this.property]: this.newValue,
    })
  }

  undo() {
    useObjectStore.getState().updateObjectTransform(this.objectId, {
      [this.property]: this.oldValue,
    })
  }
}
