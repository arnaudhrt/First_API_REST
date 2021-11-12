import express from 'express'
import morgan from 'morgan'
import { success, error } from './function.js'
import { members } from './dataBase.js'
import { settings } from './settings.js'
const app = express()

const MembersRouter = express.Router()
// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

MembersRouter.route('/')

   .get((req, res) => {
      if (req.query.max != undefined && req.query.max > 0) {
         res.json(success(members.slice(0, req.query.max)))
      } else if (req.query.max != undefined) {
         res.json(error('Wrong max value'))
      } else {
         res.json(success(members))
      }
   })

   .post((req, res) => {
      if (req.body.name) {
         let sameName = false
         for (const member of members) {
            if (member.name === req.body.name) {
               sameName = true
               break
            }
         }
         if (sameName) {
            res.json(error('Name already taken'))
         } else {
            members.push({
               id: createId(),
               name: req.body.name
            })
            res.json(success('members added!'))
         }
      } else {
         res.json(error('No name value'))
      }
   })

MembersRouter.route('/:id')

   .get((req, res) => {
      const index = getIndex(req.params.id)
      if (index != undefined) {
         res.json(success(members[index]))
      } else {
         res.json(error('Wrong id'))
      }
   })

   .put((req, res) => {
      const index = getIndex(req.params.id)
      if (index != undefined) {
         let sameName = false
         for (let i = 0; i < members.length; i++) {
            if (req.body.name == members[i].name) {
               sameName = true
               break
            }
         }
         if (sameName) {
            res.json(error('Same name'))
         } else {
            members[index].name = req.body.name
            res.json(success(true))
         }
      } else {
         res.json(error('Wrong id'))
      }
   })

   .delete((req, res) => {
      const index = getIndex(req.params.id)
      if (index != undefined) {
         members.splice(index, 1)
         res.json(success(true))
      } else {
         res.json(error('Wrong id'))
      }
   })

app.use(settings.rootAPI + '/members', MembersRouter)

app.listen(settings.port, () => {
   console.log('started on port ' + settings.port)
})

function getIndex(id) {
   for (let i = 0; i < members.length; i++) {
      if (members[i].id == id) {
         return i
      }
   }
}

function createId() {
   return members[members.length - 1].id + 1
}
