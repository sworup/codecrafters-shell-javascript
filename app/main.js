import { createInterface } from "readline";
import buitinCommands from "./commands.js";
import { spawnSync } from "child_process";   

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question("$ ",  (answer) => {
    const commands = buitinCommands(rl);
    const commandArr = answer.trim().split(" ");
    for (const [key, func] of Object.entries(commands)) {
      if (commandArr[0] === key) {
         func(commandArr);
        if(key !== "exit")  askQuestion();
        return;
      }
    }
    
    const args = commandArr
      .slice(1)
      .map((arg) => arg.replace(/^["']|["']$/g, ""));
    const result = spawnSync(commandArr[0], args, {
      encoding: "utf-8",
      stdio: "inherit",
    });
    if (result.status !== 0) {
      rl.write(`${commandArr[0]}: command not found\n`);
    }
    askQuestion();
  });
}

 askQuestion();
