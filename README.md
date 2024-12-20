# JavaSkript
## JavaScript -> (Minecraft) Skript Transpiler!

(In The Future) A Modern Replacement For The Inactive ScriptCraft & CustomRealms.

DO NOT USE IN PRODUCTION! This Is A Work In Progress And Omits Many Crucial Features!

## Examples

```js
//Custom Join Message
skript.on("join", () => {
    skript.setJoinMessage("§l%player% Joined The Server! Say Hi!");
    skript.sendMessagePlayer("Welcome to our Server!", "%player%");
});
```

Transpiles To:

```yml
on join:
    set join message to "§l%player% Joined The Server! Say Hi!"
    send "Welcome to our Server!" to %player%
```

Commands Are Not Yet Implemented!

Many Methods Are Not Implemented, But Purely Due To Not Being Defined In Lists/Mappings.json.

All Help Is Welcome!