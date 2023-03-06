import express from 'express';
import incomeRoutes from './routes/income.js';
import employeeRoutes from './routes/employee.js';
// import costRoutes from './routes/cost.js';

import sequelize from './config/sequelize.js';


const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());

app.use(incomeRoutes);
// app.use(costRoutes);
app.use(employeeRoutes);

sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');

    // Start the server after the database is synchronized
    app.listen(3000, () => {
      console.log('Server started on port 3000.');
    });
  })
  .catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });

app.listen(port, () => {
  console.log(`Acconting app listening on port ${port}`);
});