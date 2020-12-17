export default function centsToPriceNoTrailingZeros(cents, qty = 1) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '')
  }

  const price = (cents / 100) * qty

  if (price % 1 === 0) {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  } else {
    const parts = price.toFixed(2).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `$${parts.join('.')}`
  }
}
