const express = require('express');
const toxicity = require('@tensorflow-models/toxicity');
const bodyParser = require('body-parser');
const cors = require('cors');

let model = null;

toxicity
	.load(0.8, [
		'identity_attack',
		'insult',
		'obscene',
		'severe_toxicity',
		'sexual_explicit',
		'threat',
		'toxicity',
	])
	.then(_model => {
		console.log('model loaded');

		model = _model;
	});

const app = express();
const port = 5050;
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
	model.classify(req.body.text).then(predictions => {
		res.json(predictions);
		res.end();
	});
	// res.json({ text: 'hello world' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
