const fahrenheitToCelsius = (degreesFahrenheit) => {
    if (typeof degreesFahrenheit !== 'number') {
        throw new Error('the value is not a number');
    }
    
    return (degreesFahrenheit - 32) * 5 / 9;
}

describe('fahrenheit-to-celsius', () => {
    test('canary verifies test tools', () => {
        expect(true).toEqual(true);
    });

    test('32 degrees fahrenheit is 0 degrees celsius', () => {
        expect(fahrenheitToCelsius(32)).toEqual(0);
    });

    test('212 degrees fahrenheit is 100 degrees celsius', () => {
        expect(fahrenheitToCelsius(212)).toEqual(100);
    });

    test('when value is not a number then throw an error', () => {
        expect(() => {
            fahrenheitToCelsius('test');
        }).toThrow(new Error('the value is not a number'));
    });
});