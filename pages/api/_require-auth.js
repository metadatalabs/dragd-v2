// Middleware for requiring authentication and getting user
const requireAuth = (fn) => async (req, res) => {
    
    // Respond with error if no authorization header
    if (!req.session?.siwe?.address) {
        return res.status(401).send({
            status: 'error',
            code: 'auth/invalid-user',
            message: 'You must be signed in to call this endpoint',
        });
    }

    // Get connected wallet from SIWE token
    const address = req.session.siwe?.address;

    try {
        req.user = address;

        // Call route function passed into this middleware
        return fn(req, res);
    } catch (error) {
        console.log('_require-auth error', error);

        // If there's an error assume token is expired and return
        // auth/invalid-user-token error (handled by apiRequest in util.js)
        res.status(401).send({
            status: 'error',
            code: 'auth/invalid-user-token',
            message: 'Your login has expired. Please login again.',
        });
    }
};

module.exports = requireAuth;
