import { create } from "zustand"
import React from "react"

type PanelComponent = React.ComponentType

interface PropertyPanelState {
  panelComponents: PanelComponent[]
  addPanelComponent: (component: PanelComponent) => void
}

export const usePropertyPanelStore = create<PropertyPanelState>(set => ({
  panelComponents: [],

  addPanelComponent: component =>
    set(state => ({
      panelComponents: state.panelComponents.includes(component)
        ? state.panelComponents
        : [...state.panelComponents, component],
    })),
}))
