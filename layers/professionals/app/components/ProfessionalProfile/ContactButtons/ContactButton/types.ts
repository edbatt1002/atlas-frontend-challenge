import type { CONTACT_NETWORKS } from './config'

export interface ContactButtonProps {
  network: keyof typeof CONTACT_NETWORKS
  value: string
  size?: 'md' | 'xl'
  label?: string
}
