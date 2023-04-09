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

  constructor(
    {
      width,
      height,
      depth,
      color = 0x00ff00,
      velocity = { x: 0, y: 0, z: 0 },
      boxPosition = { x: 0, y: 0, z: 0 },
    }: BoxParams,
    private gravity = -0.002,
    private friction = 0.8
  ) {
    super(
      new T.BoxGeometry(width, height, depth),
      new T.MeshStandardMaterial({ color })
    )

    this.width = width
    this.height = height
    this.depth = depth
    this.velocity = velocity

    this.position.set(boxPosition.x, boxPosition.y, boxPosition.z)
    this.deriveTopBottomPosition()
  }

  private deriveTopBottomPosition() {
    // top and bottom boundaries
    this.top = this.position.y + this.height / 2
    this.bottom = this.position.y - this.height / 2
  }

  private applyGravity(ground: Box) {
    // accelerate with gravity
    this.velocity!.y += this.gravity

    // this is when we hit the ground
    if (this.bottom + this.velocity!.y <= ground.top) {
      // less velocity on every update
      this.velocity!.y *= this.friction
      // invert velocity for bounce
      this.velocity!.y = -this.velocity!.y
    } else {
      // going down
      this.position.y += this.velocity!.y
    }
  }

  update(ground: Box) {
    this.deriveTopBottomPosition()
    this.applyGravity(ground)
  }
}
