<?php
    /*
        Assignment 6: Bestreads
        Name: Nuo Chen
        Section: AF
        Date: 05/17/2017
        This is the php file for a web service, it will provide different data
        based upon a couple query parameters named mode and title that are passed
        from the javascript to the page in its url. The value of mode should be 
        either 'description', 'info', 'reviews' or 'books'. The value of title will
        be a string representing a single book to display. 
    
    */

    $mode = $_GET["mode"];
    
    $book = $_GET["title"];

    if ($mode == "description") {  //This handles the case when the client is requesting for book descriptions
                                   //It will print out the description in plain text format. The title parameter 
                                   //must also be passed with this mode
        header('Content-Type: text/plain');
        print file_get_contents("books/$book/$mode.txt");
        
    } else if ($mode == "info") { //This handles the case when the client is requesting for book information
                                  //such as author, title, and stars. The server will print out the information
                                  //in JSON format. The title parameter must also be passed with this mode
        
        $info = file("books/$book/$mode.txt");
        
        list($title, $author, $stars) = $info;
        
        $output = array('title' => trim($title), 
                        'author' => trim($author), 
                        'stars' => trim($stars));
        
        header('Content-Type: application/json'); 
        
        print json_encode($output, JSON_PRETTY_PRINT);
        
    } else if ($mode == "reviews") { //This handles the case when the client is requesting for book reviews
                                     //It will output an array (in JSON form) containing all of the reviews 
                                     // for the book, the review score, and the name of the reviewer. 
                                     // The title parameter must also be passed with this mode
        
        $reviews = glob("books/$book/review*.txt");
        
        $finalOutput = [];
        
        foreach ($reviews as $review) {
            
            $reviewDetail = file($review);
            
            list($name, $score, $text) = $reviewDetail;
            
            $output = array('name' => trim($name), 
                            'score' => trim($score), 
                            'text' => trim($text));
            
            $finalOutput[] = $output;
            
        }
        header('Content-Type: application/json'); 
        
        print json_encode($finalOutput, JSON_PRETTY_PRINT);
        
    } else if ($mode == "books") { //This handles the case when the client is requesting for
                                   //all the books that are available. It outputs JSON containing 
                                   //the titles and folder names for each of the books that you have
                                   //data for.
    
        $dirs = scandir("books/");
        
        $truedirs = array_diff($dirs, ['.', '..']);
        
        $bookArray = [];
        
        foreach ($truedirs as $bookFolder) {
            
            $fileInfo = file("books/$bookFolder/info.txt");
            
            $bookInfo = array('title' => trim($fileInfo[0]), 
                             'folder' => $bookFolder);
            
            $bookArray[] = $bookInfo;

        }
        
        $output = array('books' => $bookArray);
        
        header('Content-Type: application/json'); 
        
        print json_encode($output, JSON_PRETTY_PRINT);
        
    }

    
?>
