import * as T from 'three'

type BoxParams = {
  width: number
  height: number
  depth: number
  color?: number
  velocity?: {
    x: number
    y: number
    z: number
  }
  boxPosition?: {
    x: number
    y: number
    z: number
  }
  ground?: Box
}

export default class Box extends T.Mesh {
  width: number
  height: number
  depth: number
  top!: number
  bottom!: number
  velocity!: BoxParams['velocity']
  boxPosition!: BoxParams['boxPosition']

  constructor({
    width,
    height,
    depth,
    color = 0x00ff00,
    velocity = { x: 0, y: 0, z: 0 },
    boxPosition = { x: 0, y: 0, z: 0 },
    ground,
  }: BoxParams) {
    super(
      new T.BoxGeometry(width, height, depth),
      new T.MeshStandardMaterial({ color })
    )

    this.width = width
    this.height = height
    this.depth = depth
    this.velocity = velocity

    this.position.set(boxPosition.x, boxPosition.y, boxPosition.z)
    this.update()

    ground && this.collision(ground)
  }

  private update() {
    this.top = this.position.y + this.height / 2
    this.bottom = this.position.y - this.height / 2
  }

  collision(ground: Box) {
    this.update()

    this.position.y += this.velocity!.y
    if (this.bottom <= ground.top) this.velocity!.y = 0
  }
}
