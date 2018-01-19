

module.exports = (themeName) => fetch(`${window.location.origin}/theme/${themeName}`)
    .then((res) => res.json());
