var mongoose = require("mongoose");
var Member = require("../model/members");

var memberController = {};

// Show list of members
memberController.list = function (req, res) {
    Member.find({}).exec(function (err, members) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/member", { members: members });
        }
    });
};

// Create new members
memberController.create = function (req, res) {
    res.render("../views/member/create");
};

// Save new members
memberController.save = function (req, res) {
    var member = new Member(req.body);

    member.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/member/create");
        } else {
            console.log("Successfully created a memebr.");
            res.redirect("/members/show/" + member._id);
        }
    });
};

// Show member by id
memberController.show = function (req, res) {
    Member.findOne({ _id: req.params.id }).exec(function (err, member) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/member/show", { member: member });
        }
    });
};

// Edit a member
memberController.edit = function (req, res) {
    Member.findOne({ _id: req.params.id }).exec(function (err, member) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/member/edit", { member: member });
        }
    });
};

// Update a member
memberController.update = function (req, res) {
    Member.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary } }, { new: true }, function (err, member) {
        if (err) {
            console.log(err);
            res.render("../views/member/edit", { member: req.body });
        }
        res.redirect("/members/show/" + member._id);
    });
};

// Delete a member
memberController.delete = function (req, res) {
    Member.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("member deleted!");
            res.redirect("/members");
        }
    });
};

module.exports = memberController;