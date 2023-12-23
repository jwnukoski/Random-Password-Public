import dict from "./dict";

export function randomBoolean() {
    return Math.random() >= 0.5;
}

export function getRandomWord(wordCase) {
    let randomWord = dict[Math.floor(Math.random() * dict.length)];

    switch (wordCase) {
        case "lowercase":
            return randomWord.toLowerCase();
        case "uppercase":
            return randomWord.toUpperCase();
        case "camelcase":
            return randomWord.charAt(0).toUpperCase() + randomWord.slice(1).toLowerCase();
        default:
            return randomWord;
    }
}

export function getPassphrase(wordCount, wordSeparator = '', wordCase = 'camelcase') {
    let passphrase = [];

    for (let i = 0; i < wordCount; i++) {
        passphrase.push(getRandomWord(wordCase));
    }

    return passphrase.join(wordSeparator);
}

export function getPassword(length, includeUppercase = true, includeLowercase = true, includeNumbers = true, includeSymbols = true) {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=";
    let password = [];

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        return password;
    }

    let i = 0;
    while (i < length) {
        if (randomBoolean() && includeUppercase) {
            password.push(uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]);
            i++;
            continue;
        }
        if (randomBoolean() && includeLowercase) {
            password.push(lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]);
            i++;
            continue;
        }
        if (randomBoolean() && includeNumbers) {
            password.push(numbers[Math.floor(Math.random() * numbers.length)]);
            i++;
            continue;
        }
        if (randomBoolean() && includeSymbols) {
            password.push(symbols[Math.floor(Math.random() * symbols.length)]);
            i++;
            continue;
        }
    }

    return password.join("");
}