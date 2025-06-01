import express from 'express'
import cors from 'cors'
import userRouter from './routes/officer.routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/officer', userRouter)

app.listen(port, () => {
  console.log('Nook Attendance App running at port ' + port)
})
