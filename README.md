# BestReads
Creating a simple PHP web service and use Ajax to retrieve data from said web service.

# Web Service Details
bestreads.php service will provide different data based upon a couple query parameters named mode and
title that are passed from your Javascript to the page in its URL. The value of mode should be description,
info, reviews or books depending on which information you want. The value of title should be a string
representing the single book to display. The browser should request with a URL such as the following:

> //some.host.com/path/to/bestreads.php?mode=description&title=harrypotter

The behavior of each mode is described below:
<ul>
<li> mode=description: The title parameter must also be passed with this mode. The web service should locate
the file called description.txt for the book, and output the entire contents as plain text. This is the
only mode that should output its response as plain text; all of the others output JSON. </li>
<li> mode=info: The title parameter must also be passed with this mode. The web service should output the
contents of info.txt, a file with three lines of information about the book: its title, author, and number
of stars, as JSON. </li>

Example output:
```
{
"title":"Harry Potter and the Prisoner of Azkaban",
"author":"by J.K. Rowling, Mary GrandPre(Illustrator)",
"stars":"4.5"
}
```
<li> mode=reviews: The title parameter must also be passed with this mode. Output an array (in JSON
form) containing all of the reviews for the book, the review score, and the name of the reviewer. The
reviews are stored in files called review1.txt, review2.txt, etc. Each file contains one review for each
book which is exactly three lines: The reviewer’s name, the number of stars they gave the book and their
review. If a book has 10 or more reviews, the names will be e.g. review01.txt, .... </li>

Example output:
```
[
{
"name" : "Wil Wheaton",
"score" : 4,
"text" : "I'm beginning to wonder if there will ever be a Defense
Against The Dark Arts teacher who is just a teacher"
},
{
"name" : "Zoe",
"score" : 5,
"text" : "Yup yup yup I love this book"
},
{
"name" : "Kiki"
"score" : 5,
"text" : "Literally one of the best books I've ever read. I
was chained to it for two days."
}
]
```
<li>mode=books: Outputs JSON containing the titles and folder names for each of the books that we have
data for. Find all the books inside the books folder, and build JSON containing information about each
one. </li>

Example output:
```
{
"books" : [
{
"title": "Harry Potter and the Prisoner of Azkaban",
"folder": "harrypotter"
},
{
"title": "The Hobbit",
"folder": "hobbit"
},
... (one entry like this for each folder inside books/)
]
}
```
</ul>

# Javascript Details
bestreads.js will use Ajax to request data from the PHP service and insert it into bestreads.html. Here
is the functionality that the page have:
• When the page loads it should request all of the books (mode=books) from the web service. It should
display each of these books by adding the image of the books cover and the books title (in a paragraph)
to a div and adding that div to the allbooks div already on the page. The singlebook div should be
hidden.
• If the home button on the upper right is clicked it should do the same thing that the page does when
it loads. Even if the button is pressed multiple times very quickly, only one listing for each book should
appear on the page.
• When a user clicks on a book cover or title of a book, the page will instead render the info, description and 
reviews for the selected book. 
