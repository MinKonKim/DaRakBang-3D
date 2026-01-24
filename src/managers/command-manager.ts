/**
 * 사용자의 모든 편집 동작을 객체화하여 Undo/Redo 시스템을 구축합니다.
 */

export interface ICommand {
  execute(): void
  undo(): void
}

class CommandManager {
  private history: ICommand[] = []
  private redoStack: ICommand[] = []
  private listeners: (() => void)[] = []

  /**
   * 상태 변경 알림을 구독합니다.
   * React 컴포넌트에서 Undo/Redo 버튼 활성화 상태 등을 동기화할 때 사용합니다.
   */
  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener())
  }

  /**
   * 명령을 실행하고 히스토리에 저장합니다.
   */
  execute(command: ICommand) {
    command.execute()
    this.history.push(command)
    this.redoStack = [] // 새로운 명령 실행 시 Redo 스택 초기화
    this.notify()
    console.log(`[CommandManager] Executed: ${command.constructor.name}`)
  }

  /**
   * 가장 최근 명령을 취소(Undo)합니다.
   */
  undo() {
    const command = this.history.pop()
    if (command) {
      console.log(`[CommandManager] Undo: ${command.constructor.name}`)
      command.undo()
      this.redoStack.push(command)
      this.notify()
    }
  }

  /**
   * 취소된 명령을 다시 실행(Redo)합니다.
   */
  redo() {
    const command = this.redoStack.pop()
    if (command) {
      console.log(`[CommandManager] Redo: ${command.constructor.name}`)
      command.execute()
      this.history.push(command)
      this.notify()
    }
  }

  /**
   * 히스토리를 초기화합니다. (새로운 씬 로드 시 등)
   */
  clear() {
    this.history = []
    this.redoStack = []
    this.notify()
  }

  get canUndo() {
    return this.history.length > 0
  }

  get canRedo() {
    return this.redoStack.length > 0
  }
}

// 싱글톤 인스턴스 export
export const commandManager = new CommandManager()
