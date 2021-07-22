var express = require('express');
var router = express.Router();
// bring in the models
//Controllers
const basicController = require('../controllers/basicController');

let Person = require('../model/person');
var Book = require('../model/book');
//Pages
// router.get('/', (req, res) => res.render('index', { title: 'Welcome to Library'}));
router.get('/members', (req, res) => res.render('members'));
router.get('/createbook', (req, res) => res.render('createbook'));

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.find({}, function(err,person) {
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

// Get all posts
router.get("/member/:id", async (req, res) => {
  var _id = req.params.id;
  res.render('createbook');
})

router.post("/addbook", async (req, res) => {

  var { name,rate } = req.body;
  var books = {name: name, rate: rate};
  basicController.addBooks(books)
  .then(book => {
    res.redirect('/books')
  })
  .catch(err => console.log(err));
})

// router.post('books/:id',(req, res, next) => {
//   Book.remove({_id: req.params.id})
//   .then(result => {
//     res.status(200).json({
//       message: "Book deleted succesfully",
//       result: result
//     })
//   })
//   .catch(err => {res.status(500).json({
//     error: err
//   })});
// }); 

// router.delete('/blogs/:id', (req, res) => {
//   Blog.findByIdAndDelete(req.params.id).then((blog) => {
//       if (!blog) {
//           return res.status(404).send();
//       }
//       res.send(blog);
//   }).catch((error) => {
//       res.status(500).send(error);
//   })
// })

router.post('/removebook', function(req,res){

  basicController.removebook(req.query.id)
  .then(book => {
    res.redirect('/books')
  })
  .catch(err => console.log(err));
  // Book.remove({
  //   _id: req.params.id,
  // }, function (err, user) {
  //   if (err)
  //     return console.error(err);

  //   console.log('User successfully removed from polls collection!');
  //   res.status(200).send();


  // });

});


module.exports = router;
