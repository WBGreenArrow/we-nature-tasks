export const orderingId = (array: Array<any>) => {
  const newArrayOrdered = array.map((item, key) => ({ ...item, id: key + 1 }))
  return newArrayOrdered
}
