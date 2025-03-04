const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }
}
export default getLocalStorageItem
