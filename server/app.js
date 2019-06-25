import express from 'express';

const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to Secret Family Food Recipe',
  });
});

app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
})

export default app;
