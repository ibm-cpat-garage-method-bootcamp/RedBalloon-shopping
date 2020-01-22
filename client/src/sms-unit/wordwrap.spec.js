const wordWrap = (word, num) => {
    var length = word.length;

    if (num === length) {
        return word;
    } else {
        var newWord = word;
        for (var i = 1; i <= length; i++) {
            if (i % num === 0) {
                newWord = [newWord.slice(0, i), '_', newWord.slice(i)].join('');
                i+=num;
            }
        }
        return newWord;
    }

};

describe('wordwrap', () => {
    test('wordwrap test #1', () => {
        expect(wordWrap('a', 1)).toEqual('a');
    });

    test('wordwrap test #2', () => {
        expect(wordWrap('aa', 1)).toEqual('a_a');
    });

    test('wordwrap test #3', () => {
        expect(wordWrap('aaa', 1)).toEqual('a_a_a');
    });

    test('wordwrap test #4', () => {
        expect(wordWrap('aaaa', 2)).toEqual('aa_aa');
    });

    // test('wordwrap test #5', () => {
        // expect(wordWrap('a b', 1)).toEqual('a_b');
    // });

    // test('wordwrap test #6', () => {
        // expect(wordWrap('aa bb', 4)).toEqual('aa_bb');
    // });

    // test('wordwrap test #7', () => {
        // expect(wordWrap('aa bb cc', 4)).toEqual('aa_bb_cc');
    // });
});