/*
    Assignment 6: Bestreads
    Name: Nuo Chen
    Section: AF
    Date: 05/18/2017
    This javascript file is for bestreads, a website that has book reviews
    and information about books. This file injects the webpage with information
    from the server via making server calls. 
*/

// Module Pattern
(function() {
    
    "use strict";
    var $ = function(id) { return document.getElementById(id); };
    
    // When the webpage is loaded, it will initially starts by displaying 
    // all the books available, and when the home button on the upper right is 
    // clicked it should do the same thing that the page does when it loads.
    window.onload = function() {
        
        displayBooks();
        $("back").onclick = displayBooks;
        
    };
    
    // This function is called when the page loads and when the "Home" button 
    // on the upper right is clicked. This function also makes sure that the page
    // view is set to display all books and that the details about single book
    // is hidden. Note that even if the "Home" button is pressed multiple times 
    // very quickly, only one listing for each book should appear on the page.
    function displayBooks() {
        $("allbooks").classList.remove("hidden");
        $("singlebook").classList.add("hidden");
        if (!$("allbooks").innerHTML) {
            var getBooks = new AjaxGetPromise("bestreads.php?mode=books");
            getBooks
                .then(JSON.parse)
                .then(renderBooks);
        }
    }
    
    // This function is called to process the response from Ajax calls. The response
    // contains information about all books. This function will use that information 
    // to populate the webpage with a cover image and title for each of the books. 
    function renderBooks(response) {

        var bookList = response.books;

        for (var i = 0; i < bookList.length; i++) {
            
            var newBook = document.createElement("div");
            var bookInfo = bookList[i];
            
            var coverImg = document.createElement("img");
            coverImg.src = "books/" + bookInfo.folder + "/cover.jpg";
            coverImg.alt = bookInfo.title;
            
            var bookTitle = document.createElement("p");
            bookTitle.innerHTML = bookInfo.title;
            
            newBook.appendChild(coverImg);
            newBook.appendChild(bookTitle);
            $("allbooks").appendChild(newBook);
            
            newBook.id = bookInfo.folder;
            // Onclick event for each book
            newBook.onclick = bookDetail;
            
        }
        // hide singlebook div
        $("singlebook").classList.add("hidden");
    }

    // This function handles the onclick event for each book icon that we added when
    // populating the initial webpage. When a particular book is clicked, the webpage 
    // will instead show the details about that particular book, i.e the description
    // about that book, information such as author, title, stars and reviews about the
    // book. 
    function bookDetail() {
        
        var bookTitle = this.id;
        
        $("singlebook").classList.remove("hidden");
        $("allbooks").classList.add("hidden");
        $("cover").src = "books/" + bookTitle + "/cover.jpg";
        
        var requestDescr = new AjaxGetPromise("bestreads.php?mode=description" + "&title=" + bookTitle);
        requestDescr
            .then(showDescr);
        
        var requestInfo = new AjaxGetPromise("bestreads.php?mode=info" + "&title=" + bookTitle);
        requestInfo 
            .then(JSON.parse)
            .then(showInfo);
        
        var requestReviews = new AjaxGetPromise("bestreads.php?mode=reviews" + "&title=" + bookTitle);
        requestReviews
            .then(JSON.parse)
            .then(showReviews);
    }
    
    // This function is called to process the response from an Ajax call.
    // This function will get response that contains a description about the book
    // and display it under the description tag.
    function showDescr(response) {
        $("description").innerHTML = response;
    }
    
    // This function is called to process the response from an Ajax call.
    // This function will get response that contains book informations such as 
    // title, author and stars and inject them into the tags with matching id value.
    function showInfo(response) {
        $("title").innerHTML = response.title;
        $("author").innerHTML = response.author;
        $("stars").innerHTML = response.stars;
    }
    
    // This function is called to process the response from an Ajax call.
    // This function will get response that contains reviews about the book and then 
    // create new tags that contains those reviews and append them inside the 
    // div where the reviews are supposed to go. 
    function showReviews(response) {
        
        $("reviews").innerHTML = "";
        for (var i = 0; i < response.length; i++) {
            var newTitle = document.createElement("h3");
            var newScore = document.createElement("span");
            newScore.innerHTML = response[i].score;
            newTitle.innerHTML = response[i].name + " ";
            newTitle.appendChild(newScore);
            
            var newText = document.createElement("p");
            newText.innerHTML = response[i].text;
            
            $("reviews").appendChild(newTitle);
            $("reviews").appendChild(newText);
        }
    }

    
})(); //End Module