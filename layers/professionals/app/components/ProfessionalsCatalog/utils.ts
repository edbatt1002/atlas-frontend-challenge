export function chunkIntoRows<T>(items: T[], columns: number): T[][] {
  if (columns <= 0) return items.length ? [items] : []
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns))
  }
  return rows
}
