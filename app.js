import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import apiRoute from './route';
import Response from './helpers/Response';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', (req, res) => {
  return Response.success(res, 200, [], 'Welcome to Secret Family Recipe Cookbook API');
});

app.use('/api/v1', apiRoute);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

export default app;
