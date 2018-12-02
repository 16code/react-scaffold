const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8787;
app.use(express.static(`${__dirname}/dist`));
// app.use('/assets', express.static(`${__dirname}/dist/web/assets`));

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/index.html`));
});
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
module.exports = app;
