export const CONTACT_NETWORKS = {
  telegram: {
    label: 'Telegram',
    icon: 'i-simple-icons-telegram',
    baseUrl: 'https://t.me/',
    bgClass: 'bg-[#2aabee] hover:bg-[#2aabee]/90',
    textClass: 'text-white'
  },
  whatsapp: {
    label: 'WhatsApp',
    icon: 'i-simple-icons-whatsapp',
    baseUrl: 'https://wa.me/',
    bgClass: 'bg-[#25d366] hover:bg-[#25d366]/90',
    textClass: 'text-[#04331d]'
  }
} as const
