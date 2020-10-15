const axios = require('axios')

function quoteApi (req, res) {
  axios({
    method: 'get',
    url: 'https://favqs.com/api/qotd',
  })
  .then(data => {
    // console.log(data.data.quote.body, '<<<quote')
    quote = data.data.quote.body
    res.status(200).json({ quote })
  })
  .catch(err => {
    // console.log(err, '<<<err')
    res.status(500).json(err)
  })
}

module.exports = quoteApi