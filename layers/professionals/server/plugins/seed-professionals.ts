import { seedDb } from '../../mock/db'

export default defineNitroPlugin(() => {
  seedDb()
})
