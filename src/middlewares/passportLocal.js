import passport from 'passport'
import { Strategy } from 'passport-local';
import { User } from "../models/user.js"
import { isValidPassword, createHash } from "../utils/bcrypt.js"

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

//-------LOGIN-------//
export const strategyLogin = new Strategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          console.log('Usuario no encontrado: ' + username);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          console.log('Contraseña invalida');
          return done(null, false);
        }
        return done(null, user);
      });
    })

//-------SINGUP-------//
export const strategySignup = new Strategy({
    passReqToCallback: true
   },
    (req, username, password, done) => {
        User.findOne({ 'username': username }, function (err, user) {
   
        if (err) {
          console.log('Error in SingUp: ' + err);
          return done(err);
        }
   
        if (user) {
            console.log('El usuario ya existe');
            return done(null, false)
        }
   
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: createHash(password),
        }
        User.create(newUser, (err, userWithId) => {
            if (err) {
              console.log('Error al guardar el usuario: ' + err);
              return done(err);
            }
            console.log(user)
            console.log('El usuario se registró correctamente');
            return done(null, userWithId);
        });
    });
})


     