import {rl, commands } from "./commands.js";
import { spawnSync } from "child_process";   


function askQuestion() {
  rl.question("$ ",  (answer) => {
    const commandArr = answer.trim().split(" ");
    for (const [key, func] of Object.entries(commands)) {
      if (commandArr[0] === key) {
         func(commandArr);
        if(key !== "exit")  askQuestion();
        return;
      }
    }
    
    const result = spawnSync(commandArr[0], commandArr.slice(1), {
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
