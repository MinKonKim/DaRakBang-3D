"use client"

import { BoxGeometry, Mesh, MeshStandardMaterial } from "three"
import { BaseObject } from "./base-3d-object"

interface BoxObjectProps {
  id: string
  color?: string
}

export class BoxObject extends BaseObject {
  mesh: Mesh

  constructor(name: string) {
    super(name)
    this.mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ color: 0x00ff00 }))
    this.add(this.mesh)
  }
}
