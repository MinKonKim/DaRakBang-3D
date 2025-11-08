import { create } from "zustand"
import React from "react"

// 패널에 추가될 컴포넌트의 타입을 정의합니다.
// props가 없는 간단한 컴포넌트를 가정합니다.
type PanelComponent = React.ComponentType

// 스토어의 상태 및 액션에 대한 인터페이스
interface PropertyPanelState {
  panelComponents: PanelComponent[]
  addPanelComponent: (component: PanelComponent) => void
}

export const usePropertyPanelStore = create<PropertyPanelState>(set => ({
  // 초기 상태: 패널 컴포넌트 리스트는 비어있습니다.
  panelComponents: [],

  // 액션: 새로운 컴포넌트를 리스트에 추가합니다.
  addPanelComponent: component =>
    set(state => ({
      panelComponents: [...state.panelComponents, component],
    })),
}))
