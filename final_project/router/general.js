const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();




public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,10));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
//   filtered = users.filter((book)=>book.ISBN===ISBN)
  res.send(books[isbn]);
//   return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = [];
  let pond = Object.keys(books);
  pond.forEach(isbn =>{
      if(books[isbn]["author"]=req.params.author){
          author.push({"isbn":isbn,
          "title":books[isbn]["title"],
          "reviews":books[isbn]["reviews"]

          })
        res.send(JSON.stringify({author}, null, 4));
      }
  });
//   res.send(JSON.stringify({author}, null, 4));
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let bookTitle = [];
  let lake = Object.keys(books);
  lake.forEach(isbn =>{
      if(books[isbn]["title"]=req.params.title){
        bookTitle.push({"isbn":isbn,
        "author":books[isbn]["author"],
        "reviews":books[isbn]["reviews"]});
      }
  });
  res.send(JSON.stringify({bookTitle}, null, 4));
  
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"])

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

});

module.exports.general = public_users;
