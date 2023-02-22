export const jsonParse = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}
