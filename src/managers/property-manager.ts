import { commandManager } from "./command-manager"
import { UpdateTransformCommand } from "./commands/update-transform-command"
import { useObjectStore } from "@/modules/objects/store/use-object-store"

class PropertyManager {
  /**
   * 객체의 Transform 속성(위치, 회전, 크기)을 업데이트합니다.
   * Command 패턴을 사용하여 Undo/Redo를 지원합니다.
   */
  updateTransform(
    objectId: string,
    property: "position" | "rotation" | "scale",
    newValue: { x: number; y: number; z: number },
  ) {
    const object = useObjectStore.getState().objects[objectId]
    if (!object) return

    const oldValue = object[property]

    // 값이 변경되지 않았으면 무시 (불필요한 커맨드 생성 방지)
    if (oldValue.x === newValue.x && oldValue.y === newValue.y && oldValue.z === newValue.z) {
      return
    }

    // 유효성 검증 (예: Scale은 0이 될 수 없음 - 필요 시 추가)
    // if (property === 'scale' && (newValue.x === 0 || ...)) return;

    const command = new UpdateTransformCommand(objectId, property, oldValue, newValue)
    commandManager.execute(command)
  }
}

export const propertyManager = new PropertyManager()
