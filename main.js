if (typeof Game === 'undefined') {
    throw new Error("This script should be run within Cookie Clicker.");
}

Game.registerMod("mineFactoryMinigamesMod", {
    init: function() {
        console.log("Mine and Factory Minigames mod initialized!");

        // Enable the minigame for the Mine building
        Game.Objects['Mine'].minigameOn = 1;
        Game.Objects['Mine'].minigame = {
            name: "Mining",
            launch: () => {
                this.showMineMinigame();
            }
        };

        // Enable the minigame for the Factory building
        Game.Objects['Factory'].minigameOn = 1;
        Game.Objects['Factory'].minigame = {
            name: "Conveyor Belt",
            launch: () => {
                this.showFactoryMinigame();
            }
        };

        // Add buttons to the Mine and Factory buildings
        this.addMinigameButtons();
    },

    addMinigameButtons: function() {
        // Add the Mine minigame button
        let mineButtonContainer = Game.Objects['Mine'].l.querySelector(".minigameButton") || document.createElement("div");
        mineButtonContainer.className = "minigameButton";
        Game.Objects['Mine'].l.appendChild(mineButtonContainer);

        const mineButton = document.createElement("div");
        mineButton.className = "mineMinigameButton";
        mineButton.style = "display:inline-block; cursor:pointer; color:white; font-size:10px; margin-left:5px;";
        mineButton.innerHTML = "🪨 Mine Game";
        mineButton.onclick = () => this.showMineMinigame();

        mineButtonContainer.appendChild(mineButton);

        // Add the Factory minigame button
        let factoryButtonContainer = Game.Objects['Factory'].l.querySelector(".minigameButton") || document.createElement("div");
        factoryButtonContainer.className = "minigameButton";
        Game.Objects['Factory'].l.appendChild(factoryButtonContainer);

        const factoryButton = document.createElement("div");
        factoryButton.className = "factoryMinigameButton";
        factoryButton.style = "display:inline-block; cursor:pointer; color:white; font-size:10px; margin-left:5px;";
        factoryButton.innerHTML = "🏭 Factory Game";
        factoryButton.onclick = () => this.showFactoryMinigame();

        factoryButtonContainer.appendChild(factoryButton);
    },

    showMineMinigame: function() {
        Game.Popup("Welcome to the Mine Minigame!");

        let mineUI = document.createElement("div");
        mineUI.id = "mineMinigame";
        mineUI.style = "position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); padding:20px; background:#333; color:white; border-radius:8px; z-index:1000;";
        mineUI.innerHTML = `
            <h3>Mine Minigame</h3>
            <p>Click on the rocks to earn cookies!</p>
            <div id="rockContainer" style="position:relative; width:300px; height:200px; background:#444;"></div>
            <button onclick="document.getElementById('mineMinigame').remove()">Exit</button>
        `;
        document.body.appendChild(mineUI);
        
        this.spawnRocks();
    },

    spawnRocks: function() {
        let rockContainer = document.getElementById("rockContainer");
        rockContainer.innerHTML = "";

        for (let i = 0; i < 5; i++) {
            let rock = document.createElement("div");
            rock.className = "rock";
            rock.style = `
                position:absolute;
                width:50px;
                height:50px;
                background:#777;
                left:${Math.random() * 250}px;
                top:${Math.random() * 150}px;
                border-radius:50%;
                cursor:pointer;
            `;
            
            rock.onclick = () => {
                Game.cookies += 100;
                Game.Popup("+100 cookies!");
                rock.remove();
            };
            
            rockContainer.appendChild(rock);
        }
        
        setTimeout(() => this.spawnRocks(), 2000);
    },

    showFactoryMinigame: function() {
        Game.Popup("Welcome to the Factory Minigame!");

        let factoryUI = document.createElement("div");
        factoryUI.id = "factoryMinigame";
        factoryUI.style = "position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); padding:20px; background:#333; color:white; border-radius:8px; z-index:1000;";
        factoryUI.innerHTML = `
            <h3>Factory Minigame</h3>
            <p>Click on the golden items to earn cookies!</p>
            <div id="conveyor" style="width:400px; height:100px; overflow:hidden; position:relative; background:#555;"></div>
            <button onclick="document.getElementById('factoryMinigame').remove()">Exit</button>
        `;
        document.body.appendChild(factoryUI);
        
        this.spawnConveyorItems();
    },

    spawnConveyorItems: function() {
        let conveyor = document.getElementById("conveyor");

        function createItem() {
            let item = document.createElement("div");
            item.className = "conveyorItem";
            item.style = `
                position:absolute;
                width:30px;
                height:30px;
                background:${Math.random() < 0.1 ? "gold" : "#777"};
                top:35px;
                left:400px;
                border-radius:5px;
                transition:left 5s linear;
            `;
            
            item.onclick = function() {
                if (this.style.background === "gold") {
                    Game.cookies += 500;
                    Game.Popup("+500 cookies!");
                }
                this.remove();
            };
            
            conveyor.appendChild(item);
            setTimeout(() => item.style.left = "-30px", 50);
            setTimeout(() => item.remove(), 5000); 
        }

        setInterval(createItem, 1000);
    }
});
