import express from 'express';
import { config } from 'dotenv';
import Response from './helpers.js/Response';

config();
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return Response.success(res, 200, [], 'Welcome to Secret Family Recipe Cookbook API');
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

export default app;
