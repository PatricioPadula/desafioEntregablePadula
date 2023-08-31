export const config = {
    server:{
        port:8080,
        secretSession:"claveSecretaSessions"
    },
    mongo:{
        url:"mongodb+srv://patriciopadula:basquet8i@cluster0.m3arwr3.mongodb.net/loginDB?retryWrites=true&w=majority"
    },
    github:{
        clientId: "Iv1.fb0555a493f7e199",
        clientSecret: "62282ccae06de9c82e29e4f24bf27595c9b7817f",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    }
}