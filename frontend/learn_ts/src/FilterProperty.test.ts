import { expect, test } from 'vitest'
import { FilterProperty } from './FilterProperty'

test('property filter for normal', () => {
  const user = {
    id: 1,
    name: 'hello',
    email: 'email',
  }
  expect(FilterProperty(user, 'email')).toEqual({
    id: 1,
    name: 'hello',
  })
})
test('property filter for empty object', () => {
  const user = {
  }
  expect(FilterProperty(user)).toEqual({
  })
})

test('property filter for only one property', () => {
  const user = {
    id: 1
  }
  expect(FilterProperty(user, 'id')).toEqual({
  })
})
