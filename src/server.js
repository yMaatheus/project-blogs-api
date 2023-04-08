require('dotenv').config();
const app = require('./api');

const PORT = process.env.PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('ouvindo porta', PORT));
