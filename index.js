/*
    JavaSkript
    A Simple JavaScript -> Minecraft Skript Transpiler

    Made By Penguins184
*/

import * as fs from "fs";
import * as acorn from "acorn";
import * as estraverse from "estraverse";
import chalk from "chalk";

import * as server from "./extra/create_server.js";

//CLI
let ipath;
let opath;
const args = process.argv.slice(2);

async function main() {
    if (args.includes("-r") || args.includes("--run")) {
        console.log(`${chalk.green("[JavaSkript]")} Running Skript Server!`);
        await server.run(process.cwd());
        return;
    }

    args.forEach(async (arg, index) => {
        if (arg === "-i" || arg === "--input") {
            ipath = args[index + 1];
        }
        if (arg === "-o" || arg === "--output") {
            opath = args[index + 1];
        }
    });

    if(!ipath || !opath) console.log(`${chalk.red("[JavaSkript]")} You MUST Specify Input & Output Path With -o And -i!`) && process.exit(1);

    const mappings = JSON.parse(fs.readFileSync("./extra/mappings.json", "utf8"));
    const input = fs.readFileSync(ipath, "utf8");

    //Convert JS -> Abstract Syntax Tree
    const ast = acorn.parse(input, { ecmaVersion: 2020 });

    //Transpile To Skript
    function transpile(ast) {
        let output = "#Transpiled With The JavaSkript Project\n";

        estraverse.traverse(ast, {
            enter(node) {
                if (node.type === "CallExpression" && node.callee.property?.name in mappings) {
                    const method = node.callee.property.name;
                    const mapping = mappings[method];

                    const args = node.arguments.map(arg => (arg.type === "Literal" ? arg.value : ""));
                    const placeholders = [...mapping.matchAll(/\${(\w+)}/g)].map(match => match[1]);

                    const replacement = mapping.replace(/\${(\w+)}/g, (_, placeholder) => {
                        const index = placeholders.indexOf(placeholder);
                        return args[index] ?? ""; 
                    });

                    output += replacement;
                }
            },
        });

        return output;
    }

    let start = Date.now();
    fs.writeFileSync(opath, transpile(ast), "utf8");
    console.log(`${chalk.green("[JavaSkript]")} Transpiled ${ipath} To ${opath} Successfully! (Time: ${Date.now() - start}ms)`);
}

await main();