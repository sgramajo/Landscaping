// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false, 
  firebase:{
    apiKey: "AIzaSyBe3UdCKDX2JCe-Shcs7T1yZekhmrrPWdQ",
    authDomain: "landscapingv3.firebaseapp.com",
    databaseURL: "https://landscapingv3.firebaseio.com",
    projectId: "landscapingv3",
    storageBucket: "landscapingv3.appspot.com",
    messagingSenderId: "856235756460"
  }
};