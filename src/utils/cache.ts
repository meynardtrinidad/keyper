type Options = {}

export class Cache {
  private readonly storage: Map<string, any>
  constructor(opts?: Options) {
    this.storage = new Map<string, any>()
  }

  get(key: string) {
    return this.storage.get(key)
  }

  set(key: string, value: any) {
    return this.storage.set(key, value)
  }
}
