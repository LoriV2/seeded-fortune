function mulberry32(seed) {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

let seed;
let random = (seed) => {
    return mulberry32(seed);
}

function isDuplicate(list = [], number = 0) {
    return list.includes(number);
}

function writeData() {
    let date = document.getElementById("date-data").value;
    seed = new Date(date).getTime();
    let numbers = parseInt(document.getElementById("amount").value);
    let total = parseInt(document.getElementById("total").value);
    let interval = parseInt(document.getElementById("interval").value);

    if(!numbers || !total || !interval || !date){
        document.getElementById("result").innerHTML = "Make sure to write all the data";
        return 0;
    }

    if(total < numbers){
        document.getElementById("result").innerHTML = "The total is less than the amount of numbers to draw";
        return 0;
    }

    let resultString = "";
    let drawn = [];

    while (drawn.length < numbers) {
        let draw = Math.floor((random(seed) * total) + 1);
        seed += interval;

        // Sprawdź, czy liczba już została wylosowana
        if (!isDuplicate(drawn, draw)) {
            drawn.push(draw);
            resultString += draw + " ";
        }
    }

    document.getElementById("result").innerHTML = resultString;
    return 0;
}
