
const express = require('express');
const jwt = require('jsonwebtoken')
const admin = require("firebase-admin");
const cookieParser = require('cookie-parser')
// const firebase = require('firebase');
const app = express();

var serviceAccount = {
    "type": "service_account",
    "project_id": "homoeo-amigo-assignment",
    "private_key_id": "b76219e2d66b7d42063fb46d3186075a7cbe2271",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDW5XS1PvsJLGrG\nyxNb/c6n7I/3Ov5HsITYzT+Sin/C8Uv1c4eb4Wvmw4ay805pdn3ZZp1GWL9swfTx\nSdtSalXn/yEUeiQWIUjeL+us/IRUVcYiYeTxgwSFxwWvxyiYAYAoBthO2UvIDi9U\niG4OwyTSZEki/Cisq949SAk8BQRxx0Hn0O79OEdpikdmK/D8gMcJoDRtAdnqUCwY\nNzTTidd8OJ87jVwNnu1PzKobhKp4PP104Q68IvGYOuWOstVAe37Cw18E6xmTVNES\nMd6ehjsgV+ZINaE4Qp61sa3X1EpqJ1U1eGWWt3O73VCZkwmFVFJcCk+SZlGlgnKQ\nBri/rwF5AgMBAAECggEAAIvngWko7PEL+c1yaH17amSTnnwBQYrAC70Z4vQvNv5e\nGcBddpawK49mZvYaG504MgwCF7e0ukC+sA5msbhLgkzdIgGILfY6X+Dx/H1NPi7+\n/f9kZv4qThzKID76v3LhhziH5vYZLJJnVGkJvp0zGXCKhGhCbONTAVzkM8mKJVqX\nLSO/G1NebG0cfgXrPnjrQrVSE3FmhOUHdqKcSLSt8veD5yjhbmh9jXrotY3zNO/r\n1DpxPXT4SwleaUyNMru2aDyb3r2fP+gqBhp51hjm7iO64gp/V4pLLQ2jFly500zA\nhdG/FjctMLvNdFxOa51pMDzj0PqFwW4rZSjODD5KcQKBgQD3foGFB3RibwW/ftrU\njSNexu0uq8wffANwuCjFmYIxMckg1nwLjmS1+LNKBxo6WgjauR8LK5tSvrhn7/P/\njvgoOJguApTFS9uj5ilUbIIUBC1hENByRvvK3RwOb3cwE1J0SvipYBVt9cp2zyG/\n7Hp2Sdhrp9iv6IqEmP///hVRuwKBgQDeSCYTUjf93o9odxG5h7DC8e9CBZkdTjm/\n/J1oFbvkRiNn2qXpJDYuK2HJ3SGWsPN4hRGttAwZuDyuxTPUvnNAFvGu76lJvRwZ\nThTrnnM26wYiPXeKBUrY8fWpphcux5vOoWGr40jStjZm2it63r4Ac1rEX8r305yM\nsRZGgZecWwKBgHSfdiTbiGpB6rF7814pS7uDfYx6g+tqIqzg+sVyOrk3vpDswPMp\nHCfrk4CUrDVG69k1Vn2LBNwO5xKDLbUFB8bcNEmqCbSWtF8dO+h+YSVRepi8tZzD\n+i5z1p6uw7kxwa7vDRGzJyXzpn4pyLuJkYNf9M12AFOT/oHRHwDgF+e1AoGBALmK\nH74g8vvFuo7IVNM4oCMZL008vwHnOe03P2ySN7Pjl8ooiDSDNXZ0X7vQCSlvqsr+\nyDLmBvOxBXYcxZbfIfRtMm+DPRt/7uRweKX0LNe6dfQ+unlK0Z8k2JozOUai9zsT\nGiQQI8k+r0pK8eAt7QsTPsCL9S/IQvRtHNrdcV/hAoGBALU+rKFh9jdSa8gzCPzR\nPzvLl+Cnz8xhRFV7Itj9uTs2pW7kCBEaA6C3vRhOAxGn4Yx8qq1MLOtqsj4xQqv6\n59O8r5k2jRa5/8zDf0N7qyEkS0BDV9kCnZ/y51UJmLUaxB8wzSV3ULAIjjPKbrFQ\nhOKx2/upcbNYgz7rikhryVh3\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-gl43t@homoeo-amigo-assignment.iam.gserviceaccount.com",
    "client_id": "112257912017412558979",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gl43t%40homoeo-amigo-assignment.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://homoeo-amigo-assignment-default-rtdb.firebaseio.com"
});


// Initialize Firebase Authentication
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
    apiKey: "AIzaSyD5XJxHH6uKcYKgHYGf5WRAmYt244eEGdc",
    authDomain: "homoeo-amigo-assignment.firebaseapp.com",
    databaseURL: "https://homoeo-amigo-assignment-default-rtdb.firebaseio.com",
    projectId: "homoeo-amigo-assignment",
    storageBucket: "homoeo-amigo-assignment.appspot.com",
    messagingSenderId: "341033549646",
    appId: "1:341033549646:web:9a6b87aecd5bfd1a2c281f",
    measurementId: "G-62WY7QQ2BG"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()
const users = firestore.collection('users')
const appointment = firestore.collection('appointment')
*/

// Middlewares to parse x-www-form-urlencoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

const secretKey = 'HOMOEO-AMIGO-SECRET-KEY'

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Create a new user in Firebase Authentication
        const userRecord = await admin.auth().createUser({email: email, password: password});

        // Send a success response or JWT token for authorization if needed
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Authenticate user credentials with Firebase Authentication
        const userCredential = await admin.auth().getUserByEmail(email);

        // Generate a JWT token for authorization (optional)
        const token = generateJWTToken(userCredential.uid);

        // Send a success response or JWT token for authorization if needed
        res.cookie('token', token)
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/logout', async (req, res) => {
    try {

        // Authenticate user credentials with Firebase Authentication
        const userCredential = await admin.auth().signOut(email);

        // Generate a JWT token for authorization (optional)
        const token = generateJWTToken(userCredential.uid);

        // Send a success response or JWT token for authorization if needed
        res.cookie('token', token)
        res.status(200).json({ message: 'User logged out successfully', token });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// GET ALL THE APPOINTMENTS
app.get('/appointments', authenticateUser, async (req, res) => {

    const collectionRef = admin.firestore().collection('appointments');
    const snapshot = await collectionRef.get();

    const documents = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      documents.push({ id: doc.id, ...data });
    });

    res.status(200).json(documents);
});

// ADD NEW APPOINTMENT
app.post('/appointments', authenticateUser, (req, res) => {
    const {email} = req.body;
    admin.firestore().collection('appointments').add({
        'Date-Time': admin.firestore.FieldValue.serverTimestamp(),
        'User': email,
        'Status': 'incomplete'
      });
    res.status(200).json({ message: 'Create appointment' });
});

// FETCH APPOINTMENT USING UID
app.get('/appointments/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const userRef = await admin.firestore().collection('appointments').doc(id);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const appointment = userDoc.data();

      // Retrieve a specific appointment from the database based on the appointmentId and send a response
        res.status(200).json(appointment);
    } else {
        res.status(404).send('Not Found!');
    }
});

// UPDATE APPOINTMENT STATUS TO COMPLETE
app.put('/appointments/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const userRef = await admin.firestore().collection('appointments').doc(id);
    await userRef.update(
        {
            'Status': 'complete'
          }
    )

    // Update a specific appointment from the database based on the appointmentId
    res.status(200).json({ message: `Update appointment with ID ${id}` });
});

// DELETE A APPOINTMENT
app.delete('/appointments/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const userRef = await admin.firestore().collection('appointments').doc(id);
    await userRef.delete()

    // Delete a specific appointment from the database based on the appointmentId
    res.status(200).json({ message: `Delete appointment with ID ${id}` });
});

// Function to generate JWT token
function generateJWTToken(uid) {
    // Generate and return the JWT token using a library like jsonwebtoken
    // Example code:
    const token = jwt.sign({ uid }, secretKey);
    return token;
}

// Middleware to authenticate the user
function authenticateUser(req, res, next) {
    // Implement the necessary logic to authenticate the user, such as verifying the JWT token
    // Redirect or send an error response if the user is not authenticated
    const token = req.cookies['token'];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // Handle invalid or expired refresh token
            return res.sendStatus(403);
        }
        req.id = decoded;
    });

    next();
}


app.listen(5002, () => console.log('listening on port 5002'))