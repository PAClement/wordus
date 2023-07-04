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

    let tab_word = input.value.split(''); //recover value of input
    if (tab_word.length === tab.length && row <= 6) {

        let stateOfWord = false
        words.map(target => {
            if(target === tab_word.join('').toUpperCase()){
                stateOfWord = true;
            }
        })

        if (stateOfWord) {

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
                let message = `Excellent vous avez gagné ! <p class="my-3"> Vous avez trouvé le mot ${tab.join("")}</p>`
                modalEndGame("Congratulation !",message, "success")

            } else {
                //if LOOSE
                let message = `Dommage vous avez perdu ! <p class="my-3"> le mot était <span class="fw-bold">${tab.join("")}</span></p>`
                modalEndGame("Dommage :(",message, "danger")
            }

            input.value = '';
        }else{
            //Current word not present in our dictionnary
            displayAlert("Ce mot n\'est pas présent dans notre dictionnaire !")
        }
    } else if (tab.length > tab_word.length) {
        displayAlert("Ce mot est trop court !")

    }
}

function displayAlert(text){
    toast.show()
    document.querySelector('#toast-content').innerHTML = text;

    setTimeout(()=>{
        toast.hide()
    },2000)
}
function modalEndGame(title, content, color){
    document.querySelector('#infoModalLabel').innerHTML = title
    document.querySelector('#infoModalcontent').innerHTML = content
    document.querySelector('#infoModalHeader').classList.add(`bg-${color}`);

    infoModal.show()
}

//init
let input = document.querySelector('#word_propose');


//Listener
input.addEventListener("input", function (e) {
    //Futur update put input on tab direct not in input

    if(e.data !== " "){
        //Affichage du mot dans le tableau
        let currentRow = document.querySelector(`#row_${row}`)
        let currentWord = e.target.value

        if(currentWord.length <= tab.length){

            for(let i = 0 ; i < currentRow.children.length ; i++){
                currentRow.children[i].innerHTML = currentWord[i] !== undefined ? currentWord[i] : "."
            }

            if(currentWord.length === 0){
                currentRow.children[0].innerHTML = tab[0]
            }
        }

        if(e.target.value.slice(-1) !== "") {
            //Light keyboard when the letter is pressed
            let keyboard_td = document.getElementById(`${e.target.value.slice(-1).toUpperCase()}`)

            keyboard_td.classList.add('tdLight');
            setTimeout(() => {
                keyboard_td.classList.remove('tdLight')
            }, 100)
        }
    }else{
        e.target.value = e.target.value.trim() //Enlever les espaces
    }
})
input.addEventListener('keydown', function (event) {
    //Lors de l'appuie sur le bouton d'entrée
    event.key === "Enter" ? GetWord() : "";
});
document.addEventListener("click", function(){
    input.focus()
})


let tab = words[getRandomInt(words.length)].split('') //get random word
let row = 1; //current line of grid
let infoModal = new bootstrap.Modal(document.querySelector('#infoModal'), {
    keyboard: false,
    backdrop: 'static'
})

let toastLiveExample = document.getElementById('liveToast')
let toast = new bootstrap.Toast(toastLiveExample)

input.maxLength = tab.length
input.focus()

console.log(tab)

getGrid(tab.length, tab);

