var GoogleStrategy=require("passport-google-oauth20").Strategy;
var LocalStrategy=require("passport-local").Strategy;
var passport=require("passport");

passport.use(new GoogleStrategy({
clientID:"1013697787793-v8n6brmuh7h0upircls1p25oj1udsjrt.apps.googleusercontent.com",
clientSecret:"53GfiTAEKknl3KGkuzCT6a35",
callbackURL:"http://127.0.0.1:3000/users/google/auth/callback"
},()=>{}


));

