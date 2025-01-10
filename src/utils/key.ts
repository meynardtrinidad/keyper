import { randomBytes } from "crypto"

type KeyOptions = {
  // Refers to the length of the secret
  length?: number
}

const SEPARATOR = "_"

export class KeyV1 {
  public readonly version = 1
  public length: number
  public prefix: string
  private identifier: string
  private secret: string

  constructor(opts?: KeyOptions) {
    this.length = opts?.length || 16
    this.prefix = `v${this.version}`
    // The identifier length is hard-coded to 4 bytes for now.
    this.identifier = randomBytes(4).toString("hex")
    this.secret = randomBytes(this.length).toString("hex")
  }

  /**
   * Returns two values, the `identifier` and the `secret`
   * respectively.
   *
   * @returns [string, string]
   */
  getKeys(): [string, string] {
    return [this.identifier, this.secret]
  }

  toString(): string {
    return [this.prefix, this.identifier, this.secret].join(SEPARATOR)
  }
}
