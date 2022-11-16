const express = require("express")
const User = require("../models/User"); // new
const router = express.Router()

// Get all posts
router.get("/users", async (req, res) => {
	User.find({}, function (err,users) {
		res.json(users);
	});
})

router.delete("/user/:id", async(req, res) => {
	User.findOneAndDelete(req.params.id).then((user) => {
		if(!user) {
			return res.status(404).send();
		}
		res.send(user);
	}).catch((error) => {
		res.status(500).send(error);
	})
});

router.post("/user", (req, res) => {
	const user = new User({username: req.body.username, password: req.body.password});
	user.save().then((user) => {
		if(!user) {
			return res.status(400).send();
		}
		res.send("new user created");
	})
})
		

module.exports = router;