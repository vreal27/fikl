import express from 'express'
const Router = express.Router()

Router.get('/example', (req, res, next) => {
  res.json({
    example: 'example'
  })
})

export default Router