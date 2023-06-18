import allowedOrigins  from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credential: true,
    optionsSuccessStatus: 200
}

export default corsOptions