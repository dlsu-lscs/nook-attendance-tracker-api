import express from 'express'
import cors from 'cors'
import officerRouter from './routes/officer.routes.js'
import attendanceRouter from './routes/attendance.routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/officer', officerRouter)
app.use('/attendance', attendanceRouter)

app.listen(port, () => {
  console.log('Nook Attendance App running at port ' + port)
})
