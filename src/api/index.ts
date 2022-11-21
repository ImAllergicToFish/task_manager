import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import setupSwaggerUI from './apiDocumentation';
import { authMiddleware } from './middlewares/authMiddleware';
import { logMiddleware } from './middlewares/logMiddleware';

const app = express();

// Enables CORS
app.use(cors({ origin: true }));

// Configures the middleware
app.use(authMiddleware);
app.use(logMiddleware);

// Setup the Documentation
setupSwaggerUI(app);

//Enables Helmet, a set of tools to
//increase security.
app.use(helmet());

// Parses the body of POST/PUT request
// to JSON
app.use(bodyParser.json());

// Configure the Entity routes
const routes = express.Router();

require('./taskManagment').default(routes);


// Add the routes to the /api endpoint
app.use('/api', routes);

export default app;
