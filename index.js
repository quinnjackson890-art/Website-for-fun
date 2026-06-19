const addItemBTN = document.getElementById("dispItemOptions");
let itemOptions = document.getElementById("itemOptions");
const textInput = document.getElementById("itemText");
const confirmAddItem = document.getElementById("confirmAddItem");
const itemList = document.querySelector(".topbarItems");

itemOptions.style.display = "none";

function displayItemOptions(){
    if(itemOptions.style.display != "none"){
        itemOptions.style.display = "none";
    }
    else{
        itemOptions.style.display = "block";
    }
}

function confirmToAddItem(){
    itemOptions.style.display = "none";
    
    let newItem = document.createElement("li");
    newItem.textContent = textInput.value;
    itemList.appendChild(newItem);
}

// Next project

const three = document.getElementById("3");
const five = document.getElementById("5");
const seventeen = document.getElementById("17");
let numDisplay = document.querySelector(".numDisplay");

const numArray = ["one", "three", "four", "five", "six", "seven", "eight", "ten", "eleven", "twelve", "fourteen", "fifteen", "sixteen", "seventeen", "nineteen", "twenty", "twenty-one"];

function findNum(arr, number){
    for (let i = 0; i < arr.length; i++) {
        //const element = numArray[i];
        if (arr[i] == number){
            numDisplay.textContent = arr[i];
        }
    }
}

// Next project

class WeightedGraph {
    constructor() {
        this.adjacentcyList = new Map();
    }

    addNode(node, x, y){
        if (!this.adjacentcyList.has(node)) {
            this.adjacentcyList.set(node, new Map());
        }
        this.adjacentcyList.get(node).set("coordinates", new Map());
        this.adjacentcyList.get(node).get("coordinates").set("x", x);
        this.adjacentcyList.get(node).get("coordinates").set("y", y);
        this.adjacentcyList.get(node).set("neighbors", new Map());
    }

    addEdge(node1, node2){
        if (!this.adjacentcyList.has(node1) || !this.adjacentcyList.has(node2)) {
            console.error("Both nodes must exist in the graph to add an edge.");
            return;
        }

        const x1 = this.adjacentcyList.get(node1).get("coordinates").get("x");
        const x2 = this.adjacentcyList.get(node2).get("coordinates").get("x");
        const y1 = this.adjacentcyList.get(node1).get("coordinates").get("y");
        const y2 = this.adjacentcyList.get(node2).get("coordinates").get("y");

        const weight = Math.floor((Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))) * 100)/100;

        this.adjacentcyList.get(node1).get("neighbors").set(node2, weight);
        this.adjacentcyList.get(node2).get("neighbors").set(node1, weight);
    }

    getNeighbors(node){
        return this.adjacentcyList.get(node).get("neighbors");
    }

    hasEdge(node1, node2){
        return this.adjacentcyList.get(node2).get("neighbors").has(node1) && this.adjacentcyList.get(node1).get("neighbors").has(node2);
    }

    printGraph(){
        for(let [node, neighbors] of this.adjacentcyList){
            let anArray = [];
            for (let [neighbor, weight] of neighbors){
                if(weight != "[object Map]"){
                    anArray.push(`${neighbor} (${weight})`);
                }
                else{
                    if(neighbor === "neighbors"){
                        for(let [neighborNode, returnedWeight] of weight){
                            anArray.push(`${neighborNode} (${returnedWeight})`);
                        }
                    }
                }
            }
            console.log(`${node} -> ${anArray.join(', ')}`);
            console.log(anArray);
        }
    }

    findDistance(a, b){
        const origin = this.adjacentcyList.get(a);
        const destination = this.adjacentcyList.get(b);

        let currentVertex = origin;
        let currentDistance = 0;
        let currentNeighbors = currentVertex.get("neighbors");

        let temporaryMap = new Map();
        let distanceTracker = new Map([[a, 0]]);
        let pastConnections = new Map([[a, origin.get("neighbors")]]);

        const newCurrentVertex = () => {

            for (let [neighbor, value] of currentNeighbors){
                temporaryMap.set(neighbor, value);
            }
                
            let minKey;
            let minValue = Infinity;

            for (let [key, value] of currentNeighbors){
                if (key == b){
                    minKey = key;
                    minValue = value;
                    break;
                }
                else{
                    if (value < minValue){
                        if(distanceTracker.has(key)){
                            continue;
                        }
                        else{
                            minValue = value;
                            minKey = key;
                        }
                    }
                }
            }

            let minNeighbors = structuredClone(currentNeighbors);
            minNeighbors.delete(minKey);

            function getKeyByValue(map, searchValue){
                for (let [key, value] of map.entries()) {
                    if (value === searchValue){
                        return key;
                    }
                }
                return null;
            }

            this.adjacentcyList.get(minKey).get("neighbors").forEach((value, key) => {
                if(pastConnections.has(key) && currentVertex != origin){
                    let lastKey;
                    for (lastKey of distanceTracker.keys());
                    distanceTracker.delete(lastKey);
                    let newMinValue = this.adjacentcyList.get(key).get("neighbors").get(minKey);
                    minValue = newMinValue;
                }
            });

            let pastConnectionsCurrentVertex = getKeyByValue(this.adjacentcyList, currentVertex);
            distanceTracker.set(minKey, minValue);
            pastConnections.set(pastConnectionsCurrentVertex, minNeighbors);

            /*
                The "Past Connections" map is supposed to 
                get the minValue and log all of the 
                connections that we could've went. 
            */

            temporaryMap.clear();
            currentVertex = this.adjacentcyList.get(minKey);
            currentNeighbors = currentVertex.get("neighbors");
            
            if(currentVertex == destination){
                for(const distance of distanceTracker.values()){
                    currentDistance += distance;
                }
                console.log("Distance Found: " + currentDistance.toFixed(2) + " units");
                document.getElementById("distance").textContent = `Distance: ${currentDistance.toFixed(2)}`;
            }
        }
        while (currentVertex != destination){
            newCurrentVertex();
        }

        let temporaryArray = []
        console.log(distanceTracker);
        temporaryArray.push(...distanceTracker.keys())
        console.log(...temporaryArray);

        const finalDistance = temporaryArray.flatMap((val, i) => 
        i === temporaryArray.length - 1 ? [val] : [val, "=>"]);

        document.getElementById("directions").textContent = finalDistance;
        console.log(finalDistance);
    }
}

const graph = new WeightedGraph();

graph.addNode("Home", 4, 30);
graph.addNode("Work", 22, 29);
graph.addNode("Mall", 27, 24);
graph.addNode("Favorite Restaurant", 31, 17);
graph.addNode("Post Office", 27, 10);
graph.addNode("Auto Repair Shop", 23, -2);
graph.addNode("Grandma's House", 12, 1);
graph.addNode("Gym", 3, 6);
graph.addNode("Airport", -5, 9);
graph.addNode("Pharmacy", 2, 19);
graph.addNode("School", 13, 17);

graph.addEdge("Home", "Work");
graph.addEdge("Work", "Mall");
graph.addEdge("Mall", "Favorite Restaurant");
graph.addEdge("Favorite Restaurant", "Post Office");
graph.addEdge("Post Office", "Auto Repair Shop");
graph.addEdge("Auto Repair Shop", "Grandma's House");
graph.addEdge("Grandma's House", "Gym");
graph.addEdge("Gym", "Airport");
graph.addEdge("Airport", "Pharmacy");
graph.addEdge("Pharmacy", "Home");
graph.addEdge("Mall", "School");
graph.addEdge("Grandma's House", "School");

//graph.findDistance("Home", "Gym");

const findDistanceInput = [];

function push(a){
    findDistanceInput.push(a);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function waitUntil(conditionFn, interval = 100) {
  while (!conditionFn()) {
    await sleep(interval);
  }
}

async function returnIt(){
    await waitUntil(() => findDistanceInput.length === 2);
    graph.findDistance(findDistanceInput[0], findDistanceInput[1]);
}

returnIt();

if(findDistanceInput.length === 2){
    window.alert("2");
    /*graph.findDistance(findDistanceInput[0], findDistanceInput[1]);
    findDistanceInput = [];*/
}

document.getElementById("Home").addEventListener("click", () => push("Home"));
document.getElementById("Work").addEventListener("click", () => push("Work"));
document.getElementById("Mall").addEventListener("click", () => push("Mall"));
document.getElementById("Favorite Restaurant").addEventListener("click", () => push("Favorite Restaurant"));
document.getElementById("Post Office").addEventListener("click", () => push("Post Office"));
document.getElementById("Auto Repair Shop").addEventListener("click", () => push("Auto Repair Shop"));
document.getElementById("Grandma's House").addEventListener("click", () => push("Grandma's House"));
document.getElementById("Gym").addEventListener("click", () => push("Gym"));
document.getElementById("Airport").addEventListener("click", () => push("Airport"));
document.getElementById("Pharmacy").addEventListener("click", () => push("Pharmacy"));
document.getElementById("School").addEventListener("click", () => push("School"));

// Next Project

const menuSelect = document.getElementById("menuSelect");
const fruitOutput = document.getElementById("fruitOutput");
let fruitArray = ["Apple", "Orange", "Pear", "Banana", "Pineapple", "Strawberry", "Snozberry"];

fruitArray.forEach((inputElement) => {
    const newOption = document.createElement("option");
    newOption.value = inputElement;
    newOption.textContent = inputElement;
    menuSelect.appendChild(newOption);
});

menuSelect.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Starter"){
        fruitOutput.textContent = "";
    }
    else if(!fruitArray.includes(selectedValue)){
        fruitOutput.textContent = "Please Select A Valid Fruit from the Menu.";
    }
    else{
        fruitOutput.textContent = selectedValue;
    }
});

// Next Project

const number1 = document.getElementById("num1");
const number2 = document.getElementById("num2");
const calculatedAnswer = document.getElementById("calculatedAnswer");
const numbersForCalculator = [number1, number2];

function calculatorFindAnswer(selectedNum){
    return new Promise((resolve, reject) => {
        selectedNum.addEventListener("change", () => {
            resolve(selectedNum.value);
        })
    });
}

async function calculateAnswer(){
    
    let a = await calculatorFindAnswer(number1);
    let b = await calculatorFindAnswer(number2);

    calculatedAnswer.textContent = a*b;
}

function redo(){  
    numbersForCalculator.forEach((number) => {
        number.addEventListener("change", () => {
            if (number === number1){
                a = number.value;
                calculatedAnswer.textContent = number.value*b;
            }
            else if(number === number2){
                b = number.value;
                calculatedAnswer.textContent = number.value*a;
            }   
        });   
    });
}

calculateAnswer();
redo();

// This is a comment to ammend
// This is another comment to ammend

// Next Project

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
let rPSResult = document.getElementById("RPSResult");

rock.addEventListener("click", () => {
    rPSButtonClicked("Rock");
});

paper.addEventListener("click", () => {
    rPSButtonClicked("Paper");
});

scissors.addEventListener("click", () => {
    rPSButtonClicked("Scissors");
});

function rPSButtonClicked(btn){
    const choices = ["Rock", "Paper", "Scissors"];
    const computerNum = Math.floor(Math.random() * 3);
    const computerChoice = choices[computerNum];
    const playerChoice = btn;

    console.log("Player Choice: " + playerChoice);
    console.log("Computer Choice: " + computerChoice);

    if(computerChoice === playerChoice){
        rPSResult.textContent = "TIE!";
    }
    else{
        if ((playerChoice === "Paper" && computerChoice === "Rock") || (playerChoice === "Rock" && computerChoice === "Scissors") || (playerChoice === "Scissors" && computerChoice === "Paper")) {
            rPSResult.textContent = "You Win!";
        }
        else{
            rPSResult.textContent = "You Lose!";
        }
    }
}

const nameSearchTextArea = document.getElementById("nameSearchTextArea");
const nameSearchNames = document.getElementById("nameSearchNames");
const nameSearchListItems = document.getElementById("nameSearchListItems");

const names = []; 

for (let i = 0; i < 20; i++) {
    let name = "";
    let repeatNum = 4;
    for (let i = 0; i < repeatNum; i++){
        const character = Math.floor(Math.random() * (123 - 48) + 48);
        if((character < 65 && character > 57) || (character < 97 && character > 90)){
            repeatNum += 1;
            continue;
        }
        else{
            name += String.fromCharCode(character);
        }
    }
    names.push(name);
}

console.log(names);

//new comment for version 6
//another comment for version 7

/*

New Project ... PRODUCT ALERT!!!:

Create a custom "How fast can you spend $100 billion" game. 
Unlike most games, this game lets you see how much money
you can spend on things, but it lets you choose how much 
money you have at the start. There would be an input feild
that lets the user decide how much money they have at the 
start, and when the user makes purchases, there's even fun
sounds that play, which makes the user experience more 
engadging. This app can be used as practice for publishing
web applications.

*/