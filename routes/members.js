var express = require('express');
var router = express.Router();
var member = require("../controllers/MemberController.js");

// Get all members
router.get('/', function (req, res) {
    member.list(req, res);
});

// Create members
router.get('/create', function (req, res) {
    member.create(req, res);
});

// Save members
router.post('/save', function (req, res) {
    member.save(req, res);
});

// Get single member by id
router.get('/show/:id', function(req, res) {
    member.show(req, res);
  });

  // Edit members
router.get('/edit/:id', function(req, res) {
    member.edit(req, res);
  });
  
  // update members
  router.post('/update/:id', function(req, res) {
    member.update(req, res);
  });
  
  // Delete members
  router.post('/delete/:id', function(req, res, next) {
    member.delete(req, res);
  });
module.exports = router;