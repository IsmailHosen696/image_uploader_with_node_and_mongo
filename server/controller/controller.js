exports.home = (req, res) => {
    res.render('main');
}
exports.uploads = (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('please chose files');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.json(files);
}