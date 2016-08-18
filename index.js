const { send } = require('micro')
const getQueryParam = require('get-query-param')
const whoThat = require('who-that')
const isBlank = require('is-blank')

module.exports = async function (req, res) {
  const fullUrl = `http://foo.bar${req.url}`

  const npm = getQueryParam('npm', fullUrl)
  const github = getQueryParam('github', fullUrl)

  if (isBlank(npm) || isBlank(github)) {
    return send(res, 406)
  }

  const who = await whoThat({ npm, github })
  send(res, 200, who)
}
