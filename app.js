const express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request"),
    https = require("https"),
    app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", (req, res) => {
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email
    const data = {
        members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }

        ]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us17.api.mailchimp.com/3.0/lists/7a49b22b4f"
    const option = {
        method: "POST",
        auth: "sul1:0414bd9778cb30a2f8cd594adfd1aa56-us17"
    }
    const reqt = https.request(url, option, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })
    reqt.write(jsonData)
    reqt.end()
})

app.listen(process.env.PORT || 3000, () => {
    console.log("satrted....")
})

// 0414bd9778cb30a2f8cd594adfd1aa56-us17

// 7a49b22b4f