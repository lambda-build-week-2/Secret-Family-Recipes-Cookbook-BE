import express from 'express';
import apiRoute from './route';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to Secret Family Food Recipe',
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', apiRoute);

app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
})

export default app;
