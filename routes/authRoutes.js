const passport = require('passport');
module.exports = (app) =>{
    //app.use(require('body-parser').urlencoded({ extended: true }));
    //app.use(passport.initialize());
    app.get('/auth/google/', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/api/currentuser/', (req, res)=>{
        res.send(req.session);
    });
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
};