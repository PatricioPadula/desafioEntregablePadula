import passport from "passport";
import LocalStratgey from "passport-local";
import { createHash,isValidPassword } from "../utils.js";
import { usersService } from "../daos/index.js";
import githubStrategy from "passport-github2"
import { config } from "./config.js";

export const initializatePassport = () =>{
    passport.use("signupStrategy", new LocalStratgey(
        {
            usernameField:"email",
            passReqToCallback:true
        },
        async (req, username, password, done)=>{
            try {
                const {first_name} = req.body;
                //verifico si el usuario ya se registro
                const user = await usersService.getByEmail(username);
                if(user){
                    return done(null, false);
                }
                const newUser = {
                    first_name: first_name,
                    email: username,
                    password: createHash(password)
                };
                const userCreated = await usersService.save(newUser);
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use("loginStrategy", new LocalStratgey(
        {
            usernameField:"email"
        },
        async(username,password,done)=>{
            try {
                //verifico si el usuario ya se registro
                const user = await usersService.getByEmail(username);
                if(!user){
                    return done(null, false)
                }
                //si el usuario existe, validar la contraseña
                if(isValidPassword(user,password)){
                    return done(null, user);
                } else{
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("githubLoginStrategy", new githubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackUrl: config.github.callbackUrl
        },
        async(accesstoken,refreshToken,profile,done)=>{
            try {
                console.log(profile);
            } catch (error) {
                return done(error);
            }
        }
    ));

    //serialización y deserializacion 
    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await usersService.getById(id);
        done(null, user);
    });
}