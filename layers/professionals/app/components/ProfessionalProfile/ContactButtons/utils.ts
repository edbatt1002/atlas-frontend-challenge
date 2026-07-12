export function telegramLink(handle: string): string {
  return `https://t.me/${handle}`
}

export function whatsappLink(phone: string): string {
  return `https://wa.me/${phone}`
}
