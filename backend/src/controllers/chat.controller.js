exports.chat = async (req, res, next) => {
    try {
        res.status(200).json({
            message: 'hello from the backend!'
        });
    } catch (error) {
        next(error);
    }
};
