import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveEventDateTimes } from '../src/utils/eventFormUtils.js'

test('resolveEventDateTimes prefers edited values when present', () => {
  const activity = {
    startDateTime: '2025-02-01T10:00:00.000Z',
    endDateTime: '2025-02-01T11:00:00.000Z',
    start: { dateTime: '2025-01-01T09:00:00.000Z' },
    end: { dateTime: '2025-01-01T10:00:00.000Z' },
  }

  const result = resolveEventDateTimes(activity)

  assert.equal(result.startDateTime, '2025-02-01T10:00:00.000Z')
  assert.equal(result.endDateTime, '2025-02-01T11:00:00.000Z')
})

test('resolveEventDateTimes falls back to original event times', () => {
  const activity = {
    start: { dateTime: '2025-03-10T15:00:00.000Z' },
    end: { dateTime: '2025-03-10T16:00:00.000Z' },
  }

  const result = resolveEventDateTimes(activity)

  assert.equal(result.startDateTime, '2025-03-10T15:00:00.000Z')
  assert.equal(result.endDateTime, '2025-03-10T16:00:00.000Z')
})

test('resolveEventDateTimes returns empty strings when data missing', () => {
  const result = resolveEventDateTimes({})

  assert.equal(result.startDateTime, '')
  assert.equal(result.endDateTime, '')
})
