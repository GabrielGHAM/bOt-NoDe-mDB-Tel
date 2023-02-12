
module.exports = function getHiddenLink( parse_mode = "markdown") {
    const emptyChar = "‎"; // copied and pasted the char from https://emptycharacter.com/

    switch (parse_mode) {
        case "markdown":
            return `[${emptyChar}](${('https://i.imgur.com/ORHMwRY.jpg')})`;
        case "HTML":
            return `<a href="${'https://i.imgur.com/ORHMwRY.jpg'}">${emptyChar}</a>`;
        case "markdownV2":
            return `[${emptyChar}](${'https://i.imgur.com/ORHMwRY.jpg'})`;
        default:
            throw new Error("invalid parse_mode");
    }
}