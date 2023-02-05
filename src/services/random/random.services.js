console.log('Entró al fork');

const getRandomNumbers = (cant) => {
    let randomNumbers = {};
    for (let i = 0; i < cant; i++){
        const num = Math.floor(Math.random() * (1000 - 1) + 1);
        randomNumbers[num] ? randomNumbers[num] += 1 : randomNumbers[num] = 1;
    }
    return randomNumbers;
};

process.on('message', (cant) => {
    console.log('Cantidad recibida: ', cant)
    process.send(getRandomNumbers(cant))
});