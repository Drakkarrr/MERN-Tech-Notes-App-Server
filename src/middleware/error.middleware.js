const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({ message: err.message })


    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 400
        res.status(statusCode).json({ message: "Resource Not Found" })
    }

    if (process.env.NODE_ENV === "development") {
        res.json({
            message: err.message,
            stack: err.stack,
        })
    }
}


export { notFoundHandler, errorHandler }
