# nextech-challenge

---

Mike's notes
-

Setup:

1. Clone repository.
2. Run npm install from the ClientApp/ directory.

To run in development mode:

1. Run **ng serve** from the ClientApp/ directory.  Do not use -o (discard any browser windows that open).
2. Run the Web API from a debugger (e.g. VS Code + F5)
3. Point a browser to the root path of the running Web API (e.g. http://localhost:5000)

To run in release mode:

1. Run **dotnet publish -c release** from root directory.
2. In the release directory (bin/...etc), move the files from "publish/ClientApp/dist/ClientApp" up one level (to "dist").  I have as yet been unable to figure out how to configure the deployment to place these files here to begin with.
3. Run NextechChallenge.exe, then point a browser to where it says it's running (e.g. http://localhost:5000)

To run Angular unit tests:

1. Run **ng test** from the ClientApp/ directory.
2. Use **Ctrl+C** to end testing.

To run Angular integration tests:

1. Close any **ng serve** instances running, but ensure the API is running (port 5000).
2. Run **ng e2e** from the ClientApp/ directory.

To run C# unit tests:

1. Comment out **<StartupObject>NextechChallenge.Program</StartupObject>** in NextechChallenge.csproj.
2. Comment out the Main method in Startup.cs.
3. Use an Xunit IDE tool to run the tests in the Tests/ directory.

The first two steps are necessary because I couldn't for the life of me figure out how else to do it.  There appears to be a conflicting **Main** method in one of the libraries used for testing (I believe Microsoft.NET.Test.Sdk) and this confuses the build because it doesn't know which entry point to use.  The testing one seems to be necessary to make unit tests work, but the one in Startup.cs is of course necessary to make the app itself run.

---

Project Instructions
-

Code Challenge
Using the Hacker News API, create a solution that allows users to view the newest stories from the feed.

Your solution must be developed using an Angular front-end app that calls a C# .NET Core back-end restful API.

At a minimum, the front-end UI should consist of:

- A list of the newest stories
- Each list item should include the title and a link to the news article. Watch out for stories that do not have hyperlinks!
- A search feature that allows users to find stories
- A paging mechanism. While we love reading, 200 stories on the page is a bit much.
- Automated tests for your code

At a minimum, the back-end API should consist of:

- Usage of dependency injection, it's built-in so why not?
- Caching of the newest stories
- Automated tests for your code
- While we would love seeing an Angular only solution to this problem, we really need to see your CSharpness.

If you're up for it, upload your code challenge to an Azure website and send us the link! Azure websites have free trial periods so you don't have to pay a dime :)

Put the final solution in a GitHub repository for our review and send us the link.

Your solution will not be considered for the following reasons:

- Cannot clone solution from GitHub repository provided.
- The cloned solution will not compile locally.
- Compiled solution does not run and provide the functionality described above.
- Automated tests will not run and pass.
- Use of frameworks other than Angular (Don't use Vue, React, Razor, etc...).
- Plagiarism of others' code.

Your solution will be evaluated on:

- Elegance of design.
- Clean and understandable code.
- Use of automated tests (integration and unit).
- Demonstrated understanding of ASP.NET Core, Angular, C#, TypeScript and dependency injection.

We love code reviews and we want see your code so we can review it with you.

Put your best foot forward (we aren't looking for the simplest solution).


