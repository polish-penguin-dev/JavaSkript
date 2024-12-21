//PenguinProtocol - 0 Command JavaSkript MC Plugin
skript.on("load", () => {
    skript.sendMessageConsole("[PenguinProtocol] Skript Loaded Successfully! (v1.0)");
    skript.broadcast("[PenguinProtocol] Loaded!");
 });
 
 //Custom Join & Leave Logic
 skript.on("join", () => {
     skript.setJoinMessage("&9Welcome, %player%!");
     skript.waitSeconds(0.5);
     
     //Join Briefing
     skript
     .sendMessagePlayer("Current Time: %time%", "player");
 });
 
 skript.on("quit", () => {
    skript.setLeaveMessage("&6Bye, %player%!");
 });
 
 //Utilities (MUST BE OP AND IN CREATIVE FOR ALL!)
 
 //InvSee
 skript.on("damage", () => {
    //Conditionals
    skript.entityIs("victim", "a player");
    skript.entityHeldItem("attacker", "chest");
    skript.entityIs("attacker", "op");
    skript.isGamemode("attacker", "creative");
    
    //Messages
    skript.sendMessagePlayer("&e[PenguinProtocol] Opening %victim%'s Inventory", "attacker");
    skript.sendMessagePlayer("&e[PenguinProtocol] Operator %attacker% Is Looking Through Your Inventory!", "victim");
    skript.sendMessageConsole("&e[PenguinProtocol] Operator %attacker% Is Searching Through %victim%'s Inventory.'");
    
    //InvSee Logic
    skript.playSound("block.note_block.pling", 1, 2, "attacker");
    skript.healEntity("victim", 20);
    skript.openInventory("victim", "attacker");
 });

 //Leviosa!
 skript.on("damage", () => {
    //Conditionals
    skript.entityHeldItem("attacker", "firework rocket");
    skript.entityIs("attacker", "op");
    skript.isGamemode("attacker", "creative");
    
    //Messages
    skript.sendMessagePlayer("&e[PenguinProtocol] Casting Spell!", "attacker");
    skript.sendMessagePlayer("&e[PenguinProtocol] Wingardium Leviosa!", "victim");
    skript.sendMessageConsole("&e[PenguinProtocol] Operator %attacker% Made %victim% Float.");
    
    //Float Logic
    skript.playSound("block.note_block.pling", 1, 2, "victim");
    skript.healEntity("victim", 20);
    skript.applyEffect("levitation", 5, "victim", "10 seconds");
 });

 //Time Freeze
 skript.on("damage", () => {
    //Conditionals
    skript.entityHeldItem("attacker", "clock");
    skript.entityIs("attacker", "op");
    skript.isGamemode("attacker", "creative");
    
    //Messages
    skript.sendMessagePlayer("&e[PenguinProtocol] Freezing Player...", "attacker");
    skript.sendMessagePlayer("&e[PenguinProtocol] FREEZE!", "victim");
    skript.sendMessageConsole("&e[PenguinProtocol] Operator %attacker% Made %victim% Freeze!");
    
    //Freeze Logic (No Jump; No Move)
    skript.playSound("block.note_block.pling", 1, 2, "victim");
    skript.applyEffect("slowness", 255, "victim", "15 seconds");
    skript.executeCommandConsole("attribute %victim% minecraft:jump_strength base set 0.0000001");

    skript.waitSeconds(15);
    skript.executeCommandConsole("attribute %victim% minecraft:jump_strength base set 0.5");
 });

 //SuperFood
 skript.on("consume of apple", () => {
    //Conditional
    skript.entityIs("player", "op");
    skript.isName("event-item", "Super Food");

    //Logic
    skript.healEntity("player", 20);
    skript.applyEffect("saturation", 255, "player", "60 seconds");
    skript.applyEffect("resistance", 255, "player", "60 seconds");
    skript.applyEffect("speed", 3, "player", "60 seconds");

    //Messages
    skript.sendMessagePlayer("&e[PenguinProtocol] Yum!", "player");
    skript.sendMessageConsole("&e[PenguinProtocol] %player% Consumed SuperFood!");
 });

 //Playtime Levels
 skript.loopEveryMinute(30, () => {
    skript.broadcast("&eThanks For Playing! +1 Level.");
    skript.executeCommandConsole("xp add @a 1 levels");
 });
 
 //Backups
 skript.loopEveryHour(1, () => {
     skript.broadcast("[PenguinProtocol] Creating Backup... (This May Be Laggy!)");
     //FS Read/Stream Logic...
     
     skript.broadcast("[PenguinProtocol] Backup Complete! (Next In One Hour)"); 
 });