function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getGrid(tab_length, tab) {
    let discover = '<table><tbody>'; //concat value current underscore

    for (let i = 1; i <= 6; i++) {

        discover = discover.concat(`<tr id=\"row_${i}\">`);

        let n = 0;
        while (n < tab_length) {

            n === 0 && i === 1 ? discover = discover.concat(`<td>${tab[0]}</td>`) : "";
            n !== 0 && i === 1 ? discover = discover.concat('<td>.</td>') : "";
            i !== 1 ? discover = discover.concat('<td></td>') : "";

            n++;
        }

        discover = discover.concat('</tr>');
    }

    discover = discover.concat('</tbody></table>');

    document.querySelector('#grid').innerHTML = discover;
}

function GetWord() {
    //when word is propose

    let tab_word = document.querySelector('#word_propose').value.split(''); //recover value of input
    if (tab_word.length === tab.length && row <= 6) {

        let stateOfWord = false
        words.map(target => {
            if(target === tab_word.join('').toUpperCase()){
                stateOfWord = true;
            }
        })

        if (stateOfWord) {
            document.querySelector('#error').classList.add('d-none'); //remove error message

            let shadow_tab = [].concat(tab); //create shadow of tab (his value)
            let tab_find = []; //tab find letter

            let child = 0; //place on DOM for letter
            let win = 0; //test if is win word

            //put the words

            for (let i = 0; i < tab.length; i++) {
                child++;

                tab_word[i] = tab_word[i].toUpperCase(); //Put tab_word value to uppercase
                tab_word[i] !== tab[i]
                    ? document.querySelector(`#row_${row} td:nth-child(${child})`).classList.remove('red_letter')
                    : "";

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
                    if (tab_word[i] === tab[j] && tab[j] !== tab_find[j]) {

                        document.querySelector(`#row_${row} td:nth-child(${child})`).classList.add('yellow_letter');

                        tab.splice(j, 1, "tab-r");
                        tab_word.splice(i, 1, "tab_word-r");
                    }
                }
            }

            tab = shadow_tab; //recover data of tab

            row++;
            child = 0;

            //put find letter on current row
            if (win !== tab.length && row !== 7) {

                tab_find.forEach((target) => {
                    child++;
                    target !== "tab_find-r"
                        ? document.querySelector(`#row_${row} td:nth-child(${child})`).innerHTML = target
                        : document.querySelector(`#row_${row} td:nth-child(${child})`).innerHTML = ".";

                });

            } else if (win === tab.length) {
                //IF WORD WIN
                document.querySelector('#input_propose').classList.add('d-none'); // remove input and btn
                document.querySelector('#success').classList.remove('d-none'); //add error message for word too small

            } else {
                //if LOOSE
                document.querySelector('#input_propose').classList.add('d-none'); // remove input and btn
                document.querySelector('#loose').classList.remove('d-none'); //add error message for word too small

                document.querySelector('#loose_word').innerHTML = tab.join('');//tab to string for display
            }

        }else{
            //Current word not present in our dictionnary
            document.querySelector('#error').classList.remove('d-none'); //add error message for word too small
            document.querySelector('#error').innerHTML = 'CE MOT N\'EST PAS PRÉSENT DANS NOTRE DICTIONNAIRE';
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

//Listener
document.querySelector('#word_propose').addEventListener("input", function (e) {
    //Futur update put input on tab direct not in input
    document.querySelector('#error').classList.add('d-none'); //add error message for word too small

    let currentRow = document.querySelector(`#row_${row}`)
    let currentWord = e.target.value

    if(currentWord.length <= tab.length)
    for(let i = 0 ; i < currentRow.children.length ; i++){
        currentRow.children[i].innerHTML = currentWord[i] !== undefined ? currentWord[i] : "."
    }
})

document.querySelector('#word_propose').addEventListener('keydown', function (event) {
    //Lors de l'appuie sur le bouton d'entrée
    event.key === "Enter" ? GetWord() : "";
});

let input = document.querySelector('#word_propose');
let tab = words[getRandomInt(words.length)].split('');
let row = 1; //current line of grid

input.maxLength = tab.length
input.focus()

document.addEventListener("click", function(){
    input.focus()
})

getGrid(tab.length, tab);

