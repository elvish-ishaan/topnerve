import express, { Request, Response, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import databaseConnection from './configs/database';
import  authRoute  from './routes/auth'
import otpRoute from './routes/otp'
import courseRoute from './routes/course';
import paymentRoute from './routes/payment'
import settingRoute from  './routes/settings'
import scheduleRoute from './routes/schedule'
import testRoute from './routes/test'
import leadRoute from './routes/leaderboard'
import overviewRoute from './routes/overview'
import auxRoute from './routes/auxillary'
import cors from 'cors'

//init dotenv
dotenv.config()

//getting port
const PORT = process.env.PORT;

//initialise express app
const app = express();

//connecting db
databaseConnection();


//parssing json data
app.use(express.json());
//parsing json
app.use(express.urlencoded({ extended: true }));
//using cors
app.use(cors())

//router middleware
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/otp', otpRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/settings', settingRoute)
app.use('/api/v1/schedule', scheduleRoute)
app.use('/api/v1/test', testRoute)
app.use('/api/v1/leaderboard', leadRoute)
app.use('/api/v1/overview', overviewRoute)
app.use('/api/v1/aux', auxRoute)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'systems are working'
    })
})



//listing to port 3000
app.listen(PORT, () => console.log(`app is listing on port ${PORT}`))