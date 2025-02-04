let symbols = ["🍒", "🍋", "🍉", "⭐", "🍇", "🔔", "🎰"]; 
let wild = "🔥"; 
let scatter = "💎"; 
let score = 0;
let coins = 100;
let freeSpins = 0;
let autoSpinning = false;

function createSlots() {
    let container = document.getElementById("slots");
    container.innerHTML = "";
    for (let i = 0; i < 15; i++) {
        let slot = document.createElement("div");
        slot.className = "slot";
        slot.textContent = "❓";
        container.appendChild(slot);
    }
}

function spin() {
    if (coins < 10 && freeSpins <= 0) {
        alert("Koin tidak cukup!");
        autoSpinning = false;
        return;
    }

    if (freeSpins > 0) {
        freeSpins--;
    } else {
        coins -= 10;
    }
    document.getElementById("coins").textContent = coins;

    let slots = document.querySelectorAll(".slot");
    let results = [];
    let scatterCount = 0;
    let wildCount = 0;

    slots.forEach(slot => {
        let randomSymbol = Math.random() < 0.1 ? wild : (Math.random() < 0.15 ? scatter : symbols[Math.floor(Math.random() * symbols.length)]);
        slot.textContent = randomSymbol;
        slot.style.transform = "rotate(360deg)"; 
        results.push(randomSymbol);

        if (randomSymbol === scatter) scatterCount++;
        if (randomSymbol === wild) wildCount++;
    });

    setTimeout(() => {
        let win = checkWin(results);
        if (scatterCount >= 3) {
            freeSpins += scatterCount;
            document.getElementById("result").textContent = `🎉 FREE SPINS +${scatterCount}! 🎉`;
        } else if (win) {
            let multiplier = wildCount > 0 ? wildCount * 2 : 1;
            let reward = 20 * multiplier;
            coins += reward;
            document.getElementById("coins").textContent = coins;
            document.getElementById("result").textContent = `🔥 MENANG x${multiplier}! Dapat ${reward} koin! 🔥`;
            score += reward;
        } else {
            document.getElementById("result").textContent = "Coba lagi!";
        }

        document.getElementById("score").textContent = score;

        if (autoSpinning) {
            setTimeout(spin, 1000);
        }
    }, 500);
}

function autoSpin() {
    autoSpinning = !autoSpinning;
    if (autoSpinning) spin();
}

function checkWin(results) {
    let lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [0, 6, 12, 8, 4],
        [10, 6, 2, 8, 14]
    ];
    
    return lines.some(line => 
        line.every(idx => results[idx] === results[line[0]] && results[idx] !== scatter)
    );
}

createSlots();
