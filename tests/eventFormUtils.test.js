import { describe, it, expect } from 'vitest'
import { resolveEventDateTimes } from '../src/utils/eventFormUtils.js'

describe('resolveEventDateTimes', () => {
  it('prefers edited values when present', () => {
    const activity = {
      startDateTime: '2025-02-01T10:00:00.000Z',
      endDateTime: '2025-02-01T11:00:00.000Z',
      start: { dateTime: '2025-01-01T09:00:00.000Z' },
      end: { dateTime: '2025-01-01T10:00:00.000Z' },
    }

    const result = resolveEventDateTimes(activity)

    expect(result.startDateTime).toBe('2025-02-01T10:00:00.000Z')
    expect(result.endDateTime).toBe('2025-02-01T11:00:00.000Z')
  })

  it('falls back to original event times', () => {
    const activity = {
      start: { dateTime: '2025-03-10T15:00:00.000Z' },
      end: { dateTime: '2025-03-10T16:00:00.000Z' },
    }

    const result = resolveEventDateTimes(activity)

    expect(result.startDateTime).toBe('2025-03-10T15:00:00.000Z')
    expect(result.endDateTime).toBe('2025-03-10T16:00:00.000Z')
  })

  it('returns empty strings when data missing', () => {
    const result = resolveEventDateTimes({})

    expect(result.startDateTime).toBe('')
    expect(result.endDateTime).toBe('')
  })
})
