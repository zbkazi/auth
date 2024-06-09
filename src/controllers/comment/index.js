const create = require("./create");
const comments = require("./getAll");
const deletes = require("./delete");
const update = require("./update");

module.exports = {
    create,
    comments,
    deletes,
    update
}