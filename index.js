const {
	Octokit
} = require("@octokit/rest"),
	express = require("express"),
	config = require("config"),
	PORT = config.get('port') || 3000,
	app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.post('/postRequest', function (req, res) {
	const repo = req.body.repo,
		username = req.body.username;
	try {
		//Аутентификация
		const clientAuth = new Octokit({
			auth: config.token,
		});
		//Отправка приглашения
		clientAuth.repos.addCollaborator({
			owner: config.owner,
			repo: repo,
			username: username,
		});
		res.send("You've invited " + username);
	} catch (e) {
		console.log(e)
	}
});

async function start() {
	try {
		app.listen(PORT, () =>
			console.log(`Server has been started on port ${PORT}`)
		)
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
}

start()