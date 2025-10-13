export function resolveEventDateTimes(activity = {}) {
  const startDateTime =
    activity.startDateTime ||
    activity.start?.dateTime ||
    ''

  const endDateTime =
    activity.endDateTime ||
    activity.end?.dateTime ||
    ''

  return { startDateTime, endDateTime }
}
