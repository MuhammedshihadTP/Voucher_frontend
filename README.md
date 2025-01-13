```markdown
# Voucher Management Dashboard

This is a simple voucher management dashboard that allows users to generate, view, and download vouchers.

## Features

- Generate new vouchers with QR codes.
- View a list of existing vouchers with details.
- Download vouchers as PDF files.

## Getting Started

Follow these steps to set up and run the project on your local machine:

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MuhammedshihadTP/Voucher_frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Voucher_frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Project

To start the project, use one of the following commands:

- Development mode:

  ```bash
  npm run dev
  ```

- Production mode:

  ```bash
  npm start
  ```

### Environment Variables

Ensure the following environment variables are configured in a `.env` file:

VITE_API_URL=http://localhost:4001/api

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the dashboard to generate QR codes, view vouchers, and download them as PDFs.

