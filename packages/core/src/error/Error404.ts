class Error {
  static async index (req, res) {
    if (res.headersSent) return

    res.status(404)

    // respond with html page
    if (req.accepts('html')) {
      return res.render('default/error404')
    }

    // respond with json
    if (req.accepts('json')) {
      return res.send({ error: 'Not found' })
    }

    // default to plain-text. send()
    return res.type('txt').send('Not found')
  }
}

export default Error
