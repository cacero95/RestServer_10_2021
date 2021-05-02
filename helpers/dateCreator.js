const dateCreator = () => {
    const date = new Date();
    return  `${ date.getDate() }`;
}

module.exports = { dateCreator };