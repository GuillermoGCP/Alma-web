import { describe, it, expect } from 'vitest'
import { loadPublishedActivities } from '../src/utils/formDropdownUtils.js'

describe('loadPublishedActivities', () => {
  it('stores fetched events', async () => {
    const events = [{ id: '1' }, { id: '2' }]
    let stored = null

    const fetchFn = async () => events
    const setFn = (value) => {
      stored = value
    }

    const result = await loadPublishedActivities(fetchFn, setFn)

    expect(stored).toEqual(events)
    expect(result).toEqual(events)
  })

  it('skips update when fetch returns falsy', async () => {
    let called = false
    const fetchFn = async () => null
    const setFn = () => {
      called = true
    }

    const result = await loadPublishedActivities(fetchFn, setFn)

    expect(called).toBe(false)
    expect(result).toBe(null)
  })
})
