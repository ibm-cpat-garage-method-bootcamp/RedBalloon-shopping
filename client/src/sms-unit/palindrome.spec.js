const isPalindrome = (possiblePalindrome) => {
    var noSpaceString = possiblePalindrome.replace(/\s/g, '');
    var splitString = noSpaceString.split("");
    var reverse = splitString.reverse();
    var reverseString = reverse.join("");

    if (reverseString === noSpaceString) {
        return true;
    }
    else {
        return false;
    }
};

describe('palindrome', () => {
    test('palindrome initial test', () => {
        expect(isPalindrome('')).toEqual(true);
    });

    test('palindrome check #1', () => {
        expect(isPalindrome('a')).toEqual(true);
    });

    test('palindrome check #2', () => {
        expect(isPalindrome('mom')).toEqual(true);
    });

    test('palindrome check #3', () => {
        expect(isPalindrome('racecar')).toEqual(true);
    });
    
    test('palindrome check #4', () => {
        expect(isPalindrome(' ')).toEqual(true);
    });

    test('palindrome check #5', () => {
        expect(isPalindrome('race car')).toEqual(true);
    });
});