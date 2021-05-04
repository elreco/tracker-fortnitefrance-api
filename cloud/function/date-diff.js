
function dateDiff(date) {
    var diff = Math.abs(new Date(date) - new Date());
    var minutes = Math.floor((diff / 1000) / 60);
    return minutes
}

module.exports = dateDiff