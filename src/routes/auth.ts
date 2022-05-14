import * as express from "express"
import passport from 'passport';
// import  passport  from "../passport";
import bcrypt  from 'bcrypt';
import {db} from '../../db/db';

export const authRouter = express.Router();

interface user{
        email:string
        password? :string
        nickname:string
}


authRouter.get('/loginpage', (req:express.Request, res:express.Response, next:express.NextFunction) =>{

        // db.query('insert into test (id) values (300)', (err2, result2)=>{
        //     res.send('router success');
        // })
       res.render('loginpage')
    
});

authRouter.get('/registerpage', (req: express.Request, res: express.Response, next: express.NextFunction) => {


        res.render('registerpage')

});

authRouter.post('/register', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        
        const password = bcrypt.hashSync(req.body.new_pw1, 10);
        db.query('insert into user (email, password, nickname) values(?, ?, ?)', [req.body.email, password, req.body.nickname], (err, result) =>{
                if(err) next(err);
                // const user: user = {
                //         email: req.body.email,
                //         nickname: req.body.nickname
                // };
                return res.redirect('/');
                // req.login(user, function (err) { // auto login
                //         if (err) { return next(err); }
                //         req.session.identifier = user[0].identifier;
                //         req.session.isLogined = true;
                //         req.session.save(function () {
                                
                //         })
                // });
        })

});

authRouter.post('/login',
        passport.authenticate('local', 
        { 
                failureRedirect: '/auth/loginpage' 
        }),
        function (req: express.Request, res: express.Response) {
        req.session.isLogined = true
        req.session.save(function () {
                return res.redirect('/');
        });
});


authRouter.get('/logout', function (req, res) {
        req.session.destroy(err => {
                return res.redirect('/');
        });

});