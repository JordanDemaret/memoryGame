const game_board = document.getElementById("game-board")
const pNrbAttempt = document.getElementById("nbrAttempt")

const data = ["A","B","C","D","E","F","G","H", "A","B","C","D","E","F","G","H"]


//data.sort( () => Math.random()-0.5)
var i = data.length, j, temp;
while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = data[j];
    data[j] = data[i];
    data[i] = temp;
}

let nbrPair=0
let firstCard = 0
let canEdit = true
let nbrAttempt=0


pNrbAttempt.textContent =`number of attempt ${nbrAttempt}`

data.forEach(function(elem, index){

    const new_card = document.createElement('img')
    new_card.src= 'Dos.png';
    new_card.alt= elem
    new_card.className = "flipped"

    new_card.addEventListener('click', () =>{    
        console.log(canEdit)
        if (!canEdit)
            return
    
        new_card.src=elem+".png"
        new_card.className=""
        if (firstCard === 0){
            firstCard=new_card
            firstCard.className="disabled"
        }
        else{
            compare(firstCard, new_card)
        }
    })

    game_board.append(new_card)
})



function compare(elem1, elem2){

    if(elem1 === elem2)
        return 
    nbrAttempt++
    pNrbAttempt.textContent =`number of attempt ${nbrAttempt}`
    firstCard=0
    if (elem1.alt == elem2.alt){
        elem2.className ='disabled'
        nbrPair++
        isEnd()
    }
    else{
        canEdit = false
        setTimeout( (elem1, elem2) => {
            elem1.src = "Dos.png"
            elem1.className="flipped"
            elem1.disable=false
            elem2.src = "Dos.png"
            elem2.className="flipped"
            canEdit=true
        }, 500,elem1,elem2)
        
        
    }
}

function isEnd(){
    if (nbrPair === 8){
        const h2 = document.createElement('h2')
        h2.textContent = 'The Game is End. You are a Winer'

        game_board .before(h2)
    }
}
