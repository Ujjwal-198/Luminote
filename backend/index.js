import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import UserRoutes from './routes/UserRoutes.js'
import FileRoutes from './routes/FileRoutes.js'
import cookieParser from 'cookie-parser'
import logger from './config/logger.js'
import { generalLimiter } from './middleware/rateLimiter.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

dotenv.config()
connectDB()

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    if (error.message.includes('ENOTFOUND g.api.mega.co.nz')) {
        console.error('MEGA service is unreachable. File uploads will be disabled.');
        return;
    }
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    if (reason?.message?.includes('ENOTFOUND g.api.mega.co.nz')) {
        console.error('MEGA service is unreachable. File uploads will be disabled.');
        return;
    }
});

const app = express()

app.use(generalLimiter)

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} - ${req.ip}`);
    next();
})

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'withcredentials'],
    optionsSuccessStatus: 200
}))

app.use(cookieParser())

app.use(express.json({ limit: process.env.BODY_LIMIT || '50mb' }));
app.use(express.urlencoded({ extended: true, limit: process.env.BODY_LIMIT || '50mb' }));

app.use('/api/files', FileRoutes)
app.use('/api/user', UserRoutes)
app.use('/', (req, res) => {
    res.send('API is running')
});

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, 
    () => console.log(`Server running on port ${process.env.PORT} : http://localhost:${process.env.PORT}`)
)