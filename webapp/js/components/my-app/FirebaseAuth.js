var FirebaseAuth = (function () {
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    function FirebaseAuth(firebase) {
        this.firebase = firebase;
        //Configuracion API Firebase 
        var config = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
        };
        this.firebase.initializeApp(config);
        this.initAuth();
    }
    FirebaseAuth.prototype.initAuth = function () {
        this.firebase.auth().languageCode = 'es';
    };
    FirebaseAuth.prototype.loginGoogle = function () {
        var provider = new this.firebase.auth.GoogleAuthProvider();
        this.firebase.auth().signInWithPopup(provider).then(function (result) {
            this.token = result.credential.accessToken;
            this.user = result.user;
            console.log(this.user);
        })["catch"](function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.error("Ocurrió un error al Loguear en la página::" + errorCode + "::" + errorMessage);
        });
    };
    FirebaseAuth.prototype.isLogged = function () {
        console.log(this.user);
        return this.user;
    };
    FirebaseAuth.prototype.logOutGoogle = function () {
        this.firebase.auth().signOut().then(function () {
            console.log("LoggedOutGoogle...");
        })["catch"](function (error) {
            console.error("Ocurrió un error al cerrar la sesion: " + error);
        });
    };
    return FirebaseAuth;
}());
