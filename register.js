const express = require("express");
const mongoose = require('mongoose')
const app = express();
app.use(express.urlencoded({ extended: true }))
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));

main().then(res => {
    console.log("Connection successfully")
})
    .catch(err => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Registration")
}

const registerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Created_at: {
        type: Date,
        required: true,
    }
})

const Userdata = mongoose.model("Userdata", registerSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})


app.get('/temple.html', (req, res) => {
    res.sendFile(path.join(__dirname, "temple.html"))
})

app.get('/trekking.html', (req, res) => {
    res.sendFile(path.join(__dirname, "trekking.html"))
})

app.get('/familyTrip.html', (req, res) => {
    res.sendFile(path.join(__dirname, "familyTrip.html"))
})

app.get('/boatTrip.html', (req, res) => {
    res.sendFile(path.join(__dirname, "boatTrip.html"))
})

app.get('/bikeRiding.html', (req, res) => {
    res.sendFile(path.join(__dirname, "bikeRiding.html"))
})

app.get('/historical.html', (req, res) => {
    res.sendFile(path.join(__dirname, "historical.html"))
})

app.get('/loginPage/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, "loginPage/register.html"))
})


app.get('/loginPage/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, "loginPage/login.html"))
})


app.post('/store', (req, res) => {

    var { fname, uname, add, pas } = req.body
    var reg = new Userdata({
        Name: fname,
        Username: uname,
        Address: add,
        Password: pas,
        Created_at: new Date(),
    })
    reg.save()
        .then(() => {
            res.redirect("http://127.0.0.1:8080/index.html")
        })

})

app.post("/loggedin", async (req, res) => {
    let username = req.body.username;
    let pass = req.body.pass;
    await Userdata.findOne({ Username: username, Password: pass })
        .then((data) => {
            // console.log(data)
            // res.send("working")
            if (data == null) {
                res.send("Such user does not exist")
            }
            else {
                res.redirect("http://127.0.0.1:8080/index.html")
                // res.render("index.ejs",username)
            }
        })
        .catch(() => {
            res.status(401).send('Invalid username or password');
        })
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})