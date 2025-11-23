import {rl, commands } from "./commands.js";

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
    
    console.log(`${commandArr[0]}: command not found`);
     askQuestion();
  });
}

 askQuestion();
