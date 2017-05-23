const express = require('express');
const app = express();

app.get('/api', (req, resp) => {
    resp.json({
          data: 'Simple api'
        });
});

app.listen(8581, () => {
    console.log('server running at port 8581');
});
