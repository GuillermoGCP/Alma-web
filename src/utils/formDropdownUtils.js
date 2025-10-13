export async function loadPublishedActivities(fetchFn, setFn) {
  const events = await fetchFn()

  if (events) {
    setFn(events)
  }

  return events
}
