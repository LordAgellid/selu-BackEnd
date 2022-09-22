
function randomCode(){
    return (Math.random().toString(36).slice(-6))
}

module.exports = {
    randomCode
}