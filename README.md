<h1 align='center'>CMS</h1>

## Table of contents


1. Clone the repository:
   ```bash
   git clone https://github.com/elvish-ishaan/topnerve.git
   ```
2. Navigate to the project directory:
   
3. Run the following command to start the application:
   ```bash
   docker-compose up
   ```

### Without Docker

1. clone the repository:
   ```bash
   git clone https://github.com/code100x/cms.git
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend
   cd backend
   ```
3. Create a `.env` file based on the `.env.example` file and configure the `DATABASE_URL` with your postgreSQL connection string.
4. Install dependencies:
   ```bash
   npm install
   ```
6. Start the development server:
   ```bash
   frotend: npm run dev
   backend: nodemon
   ```

## Usage

1. Access the aplication in your browser at `http://localhost:5173/`
2. Login using any provided user credentials
   - (email: `testuser@example.com`, password: `123456`)
   - (email: `testuser2@example.com`, password: `123456`)

## Contributing

We welcome contributions from the community! To contribute to CMS, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/fooBar`).
3. Make your changes and commit them (`git commit -am 'Add some fooBar'`).
   > Make sure to lint and format your code before commiting
   >
   > - `npm run lint:check` to check for lint errors
   > - `npm run lint:fix` to fix lint errors
   > - `npm run format:check` to format the code
   > - `npm run format:fix` to fix the formatting
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

Read our [contribution guidelines](./CONTRIBUTING.md) for more details.

