var handleError = (err, statusCode, res, reason = null) => {
    console.log(err);;
    res.status(statusCode).type('json').send({
        reason: reason ? reason : err.message
    });
};

module.exports = {
    handleError: handleError
};