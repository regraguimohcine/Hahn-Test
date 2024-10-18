HOW TO RUN HAHN PROJECT (REACT 18 + .NET 8)
==========================================

Welcome! This guide will help you run both the React 18 frontend and .NET 8 backend of the Hahn Project.

BEFORE YOU START
---------------
Make sure you have these installed on your computer:
1. Node.js (v16 or later) - Download from nodejs.org
2. .NET 8 SDK - Download from microsoft.com/dotnet/download
3. SQL Server - Any recent version
4. SQL Server Management Studio (SSMS)
5. Visual Studio 2022 And VS Code

STEP 1: SET UP THE DATABASE
--------------------------
1. Open SQL Server Management Studio
2. Note down your SQL Server name (you'll need this)
3. Open the backend project
4. Find appsettings.json and update the connection string:
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR-SERVER-NAME;Database=HahnDB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=false"
     }
   }
5. Save the file

STEP 2: BUILD AND RUN THE BACKEND (.NET 8)
----------------------------------------
1. Open the TicketManagementSystem_BackEnd folder in Visual Studio
2. Right-click on the solution in Solution Explorer
3. Select "Build Solution"
4. Wait for the build to complete successfully
5. Open Package Manager Console (Tools > NuGet Package Manager > Package Manager Console) , or any terminal in the current project path
6. Type: dotnet ef database update
7. Make sure you database created and have the created table with 11 records
7. Press F5 to run the project
8. You should see the API running at https://localhost:7246

STEP 3: BUILD AND RUN THE FRONTEND (REACT 18)
------------------------------------------
1. Open a new terminal/command prompt
2. Navigate to the frontend folder:
   cd TicketManagementSystem_FrontEnd
3. Install dependencies:
   npm install
4. Build the React 18 project:
   npm run build
5. Start the development server:
   npm start


STEP 4: Running Cypress Tests
-------------------------------

1. Open Terminal: Navigate to project directory.

2. Start the Frontend: Make sure your React app is running. Use:
   npm start

3. Open Cypress: Run Cypress by executing:
   npx cypress open
   This will open the Cypress Test Runner.

4. Select Tickets.cy.ts Test: In the Cypress Test Runner, you will see a list of your test files. Click on a test file to run it.

5. View Results: Watch the tests run in the Cypress window


CHECKING IF EVERYTHING WORKS
--------------------------
1. Backend API should be running at: https://localhost:7246
2. React app should open automatically in your browser at: http://localhost:3000
3. Try creating a new ticket to test if both frontend and backend are connected


Remember: Both frontend and backend must be BUILT and RUNNING at the same time for the application to work properly!