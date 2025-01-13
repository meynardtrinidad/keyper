type Options = {}

type Key = number | string

export class Cache {
  private readonly storage: Map<Key, any>
  constructor(opts?: Options) {
    this.storage = new Map<string, any>()
  }

  get(key: Key) {
    return this.storage.get(key)
  }

  set(key: Key, value: any) {
    return this.storage.set(key, value)
  }

  delete(key: Key) {
    return this.storage.delete(key)
  }
}
