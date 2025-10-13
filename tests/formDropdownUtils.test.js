import test from 'node:test'
import assert from 'node:assert/strict'
import { loadPublishedActivities } from '../src/utils/formDropdownUtils.js'

test('loadPublishedActivities stores fetched events', async () => {
  const events = [{ id: '1' }, { id: '2' }]
  let stored = null

  const fetchFn = async () => events
  const setFn = (value) => {
    stored = value
  }

  const result = await loadPublishedActivities(fetchFn, setFn)

  assert.equal(stored, events)
  assert.equal(result, events)
})

test('loadPublishedActivities skips update when fetch returns falsy', async () => {
  let called = false
  const fetchFn = async () => null
  const setFn = () => {
    called = true
  }

  const result = await loadPublishedActivities(fetchFn, setFn)

  assert.equal(called, false)
  assert.equal(result, null)
})
