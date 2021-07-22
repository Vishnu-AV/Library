let Person = require('../model/person');
var Book = require('../model/book');

exports.getBooks = function () {
    return new Promise((resolve, reject) => {
        Book.find({})
            .then(books => {
                resolve(books);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.addBooks = function (req, res) {
    return new Promise(async (resolve, reject) => {
        const book = new Book({
            name: req.name,
            rate: req.rate
        });
        await book.save()
            .then(wallet => {
                // req.flash('success_msg', 'New book added');
                // res.redirect('/books');
                resolve(wallet);
            })
            .catch(err => console.log(err));
    })
}

// remove book

exports.removebook = function (req, res) {
    return new Promise(async (resolve, reject) => {
        Book.remove({
            _id: req,
        }, function (err, user) {
            if (err)
                return console.error(err);

            console.log('User successfully removed from polls collection!');
            res.status(200).send();


        });
    })
}