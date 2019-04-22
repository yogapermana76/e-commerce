const config = {
  apiKey: "AIzaSyAFuKiOSxjZJXg0b7uGOJAwr1Ri3AuAHuw",
  authDomain: "kanban-f03d2.firebaseapp.com",
  databaseURL: "https://kanban-f03d2.firebaseio.com",
  projectId: "kanban-f03d2",
  storageBucket: "kanban-f03d2.appspot.com",
  messagingSenderId: "586388397393"
};

firebase.initializeApp(config)
const db = firebase.database()

export default db