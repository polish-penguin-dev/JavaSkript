/*
    JavaSkript
    A Simple JavaScript -> Minecraft Skript Transpiler

    Made By Penguins184
*/

import * as fs from "fs";
import * as acorn from "acorn";
import * as estraverse from "estraverse";

const mappings = JSON.parse(fs.readFileSync("./lists/mappings.json", "utf8"));
const input = process.argv[2] ? fs.readFileSync(process.argv[2], "utf8") : console.log("You MUST Include File Path To Script!") && process.exit(1);

//Convert JS -> Abstract Syntax Tree
const ast = acorn.parse(input, { ecmaVersion: 2020, sourceType: "module" });

//Transpile To Skript
function transpile(ast) {
    let output = "";

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

process.argv[3] ? fs.writeFileSync(process.argv[3], transpile(ast), "utf8") : console.log("You MUST Include File Path To Output!") && process.exit(1);
