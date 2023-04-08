import * as T from 'three'

type BoxParams = {
  width: number
  height: number
  depth: number
  color: number
}

export default class Box extends T.Mesh {
  public height: number

  constructor({ width, height, depth, color }: BoxParams) {
    super(
      new T.BoxGeometry(width, height, depth),
      new T.MeshStandardMaterial({ color })
    )

    this.height = height
  }
}
