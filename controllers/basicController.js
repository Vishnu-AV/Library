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
        const book = new Book(req.body);
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
        Book.deleteOne({
            _id: req.params.id,
        }, function (err, user) {
            if (err) {
                return console.error(err);
            } else {
                console.log('User successfully removed from polls collection!');
                res.redirect("/books");
                res.status(200).send();

            }


        });
    })
}