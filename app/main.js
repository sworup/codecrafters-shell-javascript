import {rl, commands } from "./commands.js";
import { execFile } from "child_process";   


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
    
    execFile(commandArr[0], commandArr.slice(1), (error, stdout, stderr) => {
      if (error) {
        console.error(error.message);
      } else {
        process.stdout.write(stdout);
        process.stderr.write(stderr);
      }
      askQuestion();
    });
  });
}

 askQuestion();
