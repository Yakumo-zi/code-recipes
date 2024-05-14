type User = {
  id: number,
  name: string,
  email: string,
}
type Other = {
  test: string,
  remain: string
}

export function FilterProperty<T extends Object, K extends keyof T>(obj: T, ...keys: K[]) {
  let res: Omit<T, (typeof keys)[number]> = {} as any
  Object.entries(obj).forEach(([key, value]) => {
    if (!keys.includes(key as K)) {
      Object.defineProperty(res, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: true
      })
    }
  })
  return res
}

export function test() {
  const user: User = {
    id: 1,
    name: 'Alice',
    email: 'Alice@email.cn'
  }
  const other: Other = {
    test: "test",
    remain: 'remain',
  }
  const res = FilterProperty(user, 'id')
  console.log(user)
  console.log(res)
  const remain = FilterProperty(other, 'test')
  console.log(other, remain)
  console.log(FilterProperty(remain, 'remain'))
}
