var express = require('express');
var router = express.Router();
// bring in the models
//Controllers
const basicController = require('../controllers/basicController');

var Book = require('../model/book');
//Pages
// router.get('/', (req, res) => res.render('index', { title: 'Welcome to Library'}));
router.get('/createbook', (req, res) => res.render('createbook'));

/* GET home page. */
router.get('/', function (req, res, next) {
  Book.find({}, function (err, person) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { title: 'Library', person: person });
    }
  });

});

// Get all posts
router.get("/books", async (req, res) => {
  basicController.getBooks()
    .then(books => {
      res.render('booklist', {
        title: 'booklist',
        books: books
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/')
    })

  // const posts = await Book.find()
  // res.send(posts);
})
router.post("/addbook", async (req, res) => {

  var { name, rate, author } = req.body;
  var books = { name: name, rate: rate, author: author };
  basicController.addBooks(req, res)
    .then(book => {
      res.redirect('/books')
    })
    .catch(err => console.log(err));
})

router.post('/removebook/:id', function (req, res) {

  basicController.removebook(req, res)
    .then(book => {
      res.redirect('/books')
    })
    .catch(err => console.log(err));

});


module.exports = router;
