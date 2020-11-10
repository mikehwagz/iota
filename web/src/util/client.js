const client = require('@sanity/client')

module.exports = client({
  projectId: '2hxdt5la',
  dataset: 'production',
  useCdn: false,
})
