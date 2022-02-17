
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getGrid(tab_length, tab) {
    let discover = '<table><tbody>'; //concat value current underscore

    for (let i = 1; i <= 6; i++) {

        discover = discover.concat(`<tr id=\"row_${i}\">`);

        n = 0;
        while (n < tab_length) {

            n === 0 && i === 1 ? discover = discover.concat(`<td class="red_letter">${tab[0]}</td>`) : "";
            n != 0 && i === 1 ? discover = discover.concat('<td>.</td>') : "";
            i != 1 ? discover = discover.concat('<td></td>') : "";

            n++;
        }

        discover = discover.concat('</tr>');
    }

    discover = discover.concat('</tbody></table>');

    document.querySelector('#grid').innerHTML = discover;
}

let tab = words[getRandomInt(words.length)].split('');
let row = 1;

console.log(tab);

getGrid(tab.length, tab);

function startPartie() {
    //when word is propose

    let tab_word = document.querySelector('#word_propose').value.split(''); //recover value of input

    if (tab_word.length == tab.length && row <= 6) {

        document.querySelector('#error').classList.add('d-none'); //remove error message

        let shadow_tab = [].concat(tab); //create shadowtab of tab (save value)
        let tab_find = []; //tab find letter
        let child = 0; //place on DOM for letter
        let win = 0; //test if is win word

        //put the words

        for (let i = 0; i < tab.length; i++) {
            child++;

            //Put tab_word value to uppercase
            tab_word[i] = tab_word[i].toUpperCase();

            tab_word[i] != tab[i] ? document.querySelector(`#row_${row} td:nth-child(${child})`).classList.remove('red_letter') : "";

            document.querySelector(`#row_${row} td:nth-child(${child})`).innerHTML = tab_word[i];
        }

        //same letter good place

        child = 0;

        for (let i = 0; i < tab.length; i++) {
            child++;

            if (tab[i] === tab_word[i]) {

                document.querySelector(`#row_${row} td:nth-child(${child})`).classList.add('red_letter');
                tab_find[i] = tab_word.splice(i, 1, " "); //recover good letter in tab_find

                win++;

            } else {
                tab_find[i] = "tab_find-r";
            }
        }

        //same letter other place

        child = 0;

        for (let i = 0; i < tab.length; i++) {
            child++;

            for (let j = 0; j < tab.length; j++) {
                if (tab_word[i] === tab[j] && tab[j] != tab_find[j]) {

                    document.querySelector(`#row_${row} td:nth-child(${child})`).classList.add('yellow_letter');

                    tab.splice(j, 1, "tab-r");
                    tab_word.splice(i, 1, "tab_word-r");
                }
            }
        }

        tab = shadow_tab; //recover tab

        row++;
        child = 0;

        if (win != tab.length) {
            tab_find.forEach((target) => {
                child++;
                target != "tab_find-r" ? document.querySelector(`#row_${row} td:nth-child(${child})`).innerHTML = target : document.querySelector(`#row_${row} td:nth-child(${child})`).innerHTML = ".";

            });
        } else {
            //IF WORD WIN
            document.querySelector('#input-win').classList.add('d-none'); // remove input and btn
            document.querySelector('#success').classList.remove('d-none'); //add error message for word too small

        }

    } else if (tab.length > tab_word.length) {

        document.querySelector('#error').classList.remove('d-none'); //add error message for word too small
        document.querySelector('#error').innerHTML = 'MOT TROP COURT';

    } else {

        document.querySelector('#error').classList.remove('d-none'); //add error message for word too long<
        document.querySelector('#error').innerHTML = 'MOT TROP LONG';

    }

    document.querySelector('#word_propose').value = '';
}

document.querySelector('#propose').addEventListener('click', function () {
    startPartie();
});

document.querySelector('#word_propose').addEventListener('keydown', function (event) {

    event.key === "Enter" ? startPartie() : "";
});

