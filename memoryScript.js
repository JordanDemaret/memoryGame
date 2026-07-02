const game_board = document.getElementById("game-board")
const pNrbAttempt = document.getElementById("nbrAttempt")
const timer = document.getElementById('timer')
const reset = document.getElementById('reset')
const data = ["A","B","C","D","E","F","G","H", "A","B","C","D","E","F","G","H"]


//data.sort( () => Math.random()-0.5)
function random(){
    var i = data.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random()*(i+1));
        temp = data[j];
        data[j] = data[i];
        data[i] = temp;
    }
}

let nbrPair
let firstCard, canEdit 
let nbrAttempt
let sec,min,t

init()



function starTimer(){
    t= setInterval( ()=>{
        sec++;
        if (sec >= 60){
            sec=0
            min++
        }
        timer.textContent = `Timer : ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    }, 1000)
}
    
function init(){
    nbrPair=0
    firstCard=0, canEdit =true
    nbrAttempt =0
    sec=0 ,min =0
    clearInterval(t)

    random()
    timer.textContent = `Timer : ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    pNrbAttempt.textContent =`number of attempt ${nbrAttempt}`

    game_board.innerHTML =""
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
                if(sec == 0 && min==0)
                    starTimer()
                firstCard=new_card
                firstCard.className="disabled"
            }
            else{
                compare(firstCard, new_card)
            }
        })

        game_board.append(new_card)
    })
}


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
        clearInterval(t)
        const h2 = document.createElement('h2')
        h2.textContent = 'The Game is End. You are a Winer'
        game_board .before(h2)
    }
}

reset.addEventListener('click', () => init())
