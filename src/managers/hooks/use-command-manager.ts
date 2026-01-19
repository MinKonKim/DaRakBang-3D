import { useEffect, useState } from "react"
import { commandManager, ICommand } from "../command-manager"

/**
 * CommandManager의 상태를 구독하고 기능을 제공하는 커스텀 훅입니다.
 * 컴포넌트에서 이 훅을 사용하면 Undo/Redo 상태 변경 시 자동으로 리렌더링됩니다.
 */
export const useCommandManager = () => {
  // 강제 리렌더링을 위한 상태
  const [, setTick] = useState(0)

  useEffect(() => {
    // CommandManager의 상태가 변할 때마다 컴포넌트 리렌더링
    const unsubscribe = commandManager.subscribe(() => {
      setTick(t => t + 1)
    })
    return unsubscribe
  }, [])

  return {
    undo: () => commandManager.undo(),
    redo: () => commandManager.redo(),
    canUndo: commandManager.canUndo,
    canRedo: commandManager.canRedo,
    execute: (command: ICommand) => commandManager.execute(command),
    clear: () => commandManager.clear(),
  }
}
