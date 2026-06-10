export const slugify = (input: string) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

export const formatWeight = (weight: number) => `${weight.toFixed(3)}g`

export const toCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)

export const normalizePhone = (phone: string) => phone.replace(/[^\d]/g, "")

export const buildWhatsAppUrl = (phone: string, message: string) => {
  const normalizedPhone = normalizePhone(phone)
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}

export const randomId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`
