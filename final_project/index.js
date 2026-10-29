const express = require('express');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(
    '/customer',
    session({
        secret: 'fingerprint_customer',
        resave: false,
        saveUninitialized: false
    })
);

// Require login for customer review routes
app.use('/customer/auth/*', (req, res, next) => {
    if (req.session.username) {
        return next();
    }

    return res.status(401).json({ message: 'Please log in first' });
});

app.use('/customer', customer_routes);
app.use('/', genl_routes);

const PORT = 5000;

app.listen(PORT, () => console.log('Server is running on port ' + PORT));