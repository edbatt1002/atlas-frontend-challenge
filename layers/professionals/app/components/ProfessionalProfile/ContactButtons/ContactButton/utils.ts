import { CONTACT_NETWORKS } from './config'

export function buildContactLink(network: keyof typeof CONTACT_NETWORKS, value: string): string {
  return `${CONTACT_NETWORKS[network].baseUrl}${value}`
}
