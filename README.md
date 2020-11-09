# nextech-challenge

---

Mike's notes
-

I originally built a separate .NET Core API and separate Angular app, running on different ports on localhost.  When it came time for a proper integration, before trying to serve the Angular app myself, I found a .NET Core Angular template online.  I ported my code to it, but there's a good bit of boilerplate.

My Angular code is principally in ClientApp/app, and my C# code lives in Controllers (NewsController), Logic, Models, and Services.  I've also touched Startup.cs to add dependency injection.

It should build and run out of the gate in VS Code if you do an npm install first.

My experience with automated testing is pretty scant and I'm still working that part out.  The rest is pretty much finished.

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


