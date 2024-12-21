import * as fs from "fs";
import * as child_process from "child_process";
import * as util from "util";

const exec = util.promisify(child_process.exec);

export async function run(path) {
    if(fs.existsSync(`${path}/mc_server`)) {
        console.log("[JavaSkript] Starting Existing Server...");
        await start(path);
        return;
    };

    //New Folder
    fs.mkdirSync(`${path}/mc_server`);

    //Download Latest Paper Server
    console.log("[JavaSkript] Downloading Latest Paper Server...");
    await exec(`curl -L https://mc-srv-dl-api-production.up.railway.app/download/paper/latest/latest -o "${path}/mc_server/server.jar"`);
    console.log("[JavaSkript] Download Complete!");

    //Create EULA
    console.log("[JavaSkript] Creating EULA...");
    fs.writeFileSync(`${path}/mc_server/eula.txt`, `
        #By changing the setting below to TRUE you are indicating your agreement to our EULA (https://account.mojang.com/documents/minecraft_eula).
        #Mon Jan 01 00:00:00 UTC 1977
        eula=true
    `.replace(/^\s+|\s+$/gm,""));

    //Download Skript
    fs.mkdirSync(`${path}/mc_server/plugins`);

    console.log("[JavaSkript] Downloading Skript...");
    await exec(`curl -L https://api.spiget.org/v2/resources/114544/download -o "${path}/mc_server/plugins/skript.jar"`);
    console.log("[JavaSkript] Download Complete!");

    console.log(`[JavaSkript] The Server Will Now Start. Once Started, You Can Begin To Transpile Your Script To ${path}/mc_server/plugins/Skript/scripts.`);

    //Initial Run
    await start(path);
}

async function start(path) {
    console.log("[JavaSkript] Starting Server...");
    const server = child_process.spawn("java", [
        "-Xmx2048M", "-Xms2048M", "-jar", `server.jar`, "nogui"
    ], {
        cwd: `${path}/mc_server`
    });

    //Console Work
    server.stdout.on("data", (data) => {
        console.log(data.toString().trim());

        if(data.toString().toLowerCase().includes("Done (")) {
            server.stdin.write("spark profiler stop");
        }
    });

    server.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    server.on("close", (code) => {
        console.log(`[JavaSkript] Minecraft Server Stopped With Code ${code}`);
    });

    process.on("SIGINT", () => {
        console.log("[JavaSkript] Shutting Down The Server...");
        server.kill("SIGINT"); 
        process.exit(0);
    });
}
