# Property Listing Web App

This is a web application for listing properties and viewing property details. It consists of two main pages: `PropertyList` and `PropertyDetails`. This README provides instructions on how to install, run, and test the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- A modern web browser.

## Installation

To install this project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/property-listing-app.git
   ```

1. Navigate to the project's root directory:
   cd property-listing-app
   2.Install the project's dependencies:
   npm install

Usage
Running the Application
To run the application locally, use the following command:

This will start a development server, and you can access the application in your web browser at http://localhost:3000.

The application consists of two main pages:

PropertyList: Lists available properties.
PropertyDetails: Displays details of a selected property.
Navigation
To view the list of available properties, go to http://localhost:3000.
To view the details of a property, click the "View Details" button on the PropertyList page.
Property Booking
On the PropertyDetails page, you can book a property by filling out the booking form and clicking "Submit." If successful, you will see a success message.

Testing
This project uses Jest for testing. To run the tests, use the following command:
npm run test PropertyList.test.js
