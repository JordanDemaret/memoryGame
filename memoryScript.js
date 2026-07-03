const game_board = document.getElementById("game-board")
const pNrbAttempt = document.getElementById("nbrAttempt")
const timer = document.getElementById('timer')
const resetBtn = document.getElementById('reset')
const pairFind = document.getElementById('pairFind')
const score = document.getElementById('score')
const name = document.getElementById('name')
const bestScore = document.getElementById('bestScore')
const tabScore = document.getElementById('tabScore')
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

let nbrPair =0
let firstCard =0 , canEdit =true
let nbrAttempt=0
let sec=0,min=0
let t

timer.textContent = `Timer : ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
pNrbAttempt.textContent =`number of attempt ${nbrAttempt}`
pairFind.textContent = `Pair find : ${nbrPair}/${data.length/2}`

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

function reset(){    
    nbrPair=0
    firstCard=0, canEdit =true
    nbrAttempt =0
    sec=0 ,min =0
    clearInterval(t)
    timer.textContent = `Timer : ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    pNrbAttempt.textContent =`number of attempt ${nbrAttempt}`
    pairFind.textContent = `Pair find : ${nbrPair}/${data.length/2}`
    score.textContent =''
    createGame()

}
    


function createGame(){
    random()
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
        pairFind.textContent = `Pair find : ${nbrPair}/${data.length/2}`
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
    if (nbrPair === data.length/2){
        clearInterval(t)
        const h2 = document.createElement('h2')
        h2.textContent = 'The Game is End. You are a Winer'
        game_board .before(h2)
        const theScore =calScore()
        score.textContent = `Your score : ${theScore}`

        let nameUser =name.value
        let oldScore = localStorage.getItem(nameUser)
        if (!nameUser)
            nameUser = 'other'
            
        if (!oldScore  || oldScore > theScore ){
            localStorage.setItem(nameUser,theScore)
            oldScore = theScore
            gteTabScore()
            
        } 
        bestScore.textContent = `Your best score (user : ${nameUser}) is ${oldScore}`

    }
}
function calScore() {
    return (nbrAttempt- (data.length/2)) + sec +min*60
}

function gteTabScore(){
    tabScore.innerHTML =""
    let datascore = Object.keys(localStorage).sort( (x,y) =>  localStorage.getItem(x)- localStorage.getItem(y))
    console.log(datascore)  
    datascore.forEach((nameUser) =>{
        const lineScore = document.createElement('li')
        lineScore.textContent = `User ${nameUser} Score : ${localStorage.getItem(nameUser)}`
        tabScore.append(lineScore)
    })

    

    /*let cles Triees = Object.keys(localStorage).sort();
// 2. Parcourir les clés dans le bon ordre pour lire les données
clesTriees.forEach(cle => {
    let valeur = localStorage.getItem(cle);
    console.log(`Clé : ${cle} -> Valeur : ${valeur}`);
});*/
}


resetBtn.addEventListener('click', reset)
gteTabScore()
createGame()