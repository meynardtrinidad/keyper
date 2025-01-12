import { randomBytes } from "crypto"

type KeyOptions = {
  // Refers to the length of the secret
  length?: number
}

const SEPARATOR = "_"
const VERSION = 1

export class KeyV1 {
  public readonly version = VERSION
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

  /**
   * Returns three values: `version`, `identifier` and `secret`
   * respectively.
   *
   * @returns [number, string, string]
   */
  static separate(key: string): [number, string, string] {
    const tokens = key.split(SEPARATOR)
    if (tokens.length != 3) {
      throw new Error("Invalid Token")
    }

    const version = parseInt(tokens[0].slice(1, tokens[0].length))
    if (version != VERSION) {
      throw new Error("Incorrect Version")
    }

    return [VERSION, tokens[1], tokens[2]]
  }
}
