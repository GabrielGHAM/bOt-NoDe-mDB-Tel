module.exports = function getHiddenLink(url, parse_mode = "markdown") {
    const emptyChar = "‎"; // copied and pasted the char from https://emptycharacter.com/

    switch (parse_mode) {
        case "markdown":
            return `[${emptyChar}](${url})`;
        case "HTML":
            return `<a href="${url}">${emptyChar}</a>`;
        case "markdownV2":
            return `[${emptyChar}](${url})`;
        default:
            throw new Error("invalid parse_mode");
    }
}
