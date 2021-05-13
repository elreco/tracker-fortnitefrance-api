
function dateDiff(date) {
  const diff = Math.abs(new Date(date) - new Date());
  const minutes = Math.floor((diff / 1000) / 60);
  return minutes
}

module.exports = dateDiff
