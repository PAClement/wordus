const words = [
    {
        type: "vrb",
        label: "manger",
    },
    {
        type: "nom",
        label: "ordinateur",
    },
    {
        type: "nom",
        label: "cable",
    },
    {
        type: "vrb",
        label: "apprendre",
    },
    {
        type: "nom",
        label: "radiateur",
    },
    {
        type: "vrb",
        label: "changer",
    },
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getGrid(tab_length) {
    let discover = '<table><tbody>'; //concat value current underscore

    for (i = 1; i <= 6; i++) {

        discover = discover.concat(`<tr id=\"row_${i}\">`);

        n = 0;
        while (n < tab_length) {

            discover = discover.concat('<td></td>');

            n++;
        }

        discover = discover.concat('</tr>');
    }

    discover = discover.concat('</tbody></table>');

    document.querySelector('#grid').innerHTML = discover;
}


let tab = words[getRandomInt(words.length)].label.split('');
let row = 1;

console.log(tab);

getGrid(tab.length);

document.querySelector('#propose').addEventListener('click', function () {
    //when word is propose

    document.querySelector('#error').classList.add('error_display'); //remove error message
    let current_word = document.querySelector('#word_propose').value;

    if (current_word.length == tab.length && row <= 6) {

        let tab_word = current_word.split('');
        let child = 0;

        //put the words
        for (i = 0; i < tab.length; i++) {
            child++;

            document.querySelector(`#row_${row} td:nth-child(${child})`).innerHTML = tab_word[i];
        }

        //same letter good place
        child = 0;

        for (i = 0; i < tab.length; i++) {
            child++;
            if (tab[i] === tab_word[i]) {
                document.querySelector(`#row_${row} td:nth-child(${child})`).classList.add('red_letter');
            }
        }

        //same letter other place

        for (i = 0; i < tab.length; i++) {

        }

        row++;
    } else {
        document.querySelector('#error').classList.remove('error_display'); //add error message
    }

    document.querySelector('#word_propose').value = '';
});