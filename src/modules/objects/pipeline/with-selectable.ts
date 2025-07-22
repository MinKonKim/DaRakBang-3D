import { BaseObject } from "@/components/object/3d"

export const withSelectable = (obj: BaseObject): BaseObject => {
  obj.selectable = true
  obj.setSelectCallbacks({
    onSelect: o => console.log(`${o.name} selected`),
    onDeselect: o => console.log(`${o.name} deselected`),
  })
  return obj
}
