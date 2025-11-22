const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question("$ ", (answer) => {
    const commandArr = answer.trim().split(" ");
    switch (commandArr[0]) {
      case "echo":
        console.log(commandArr.slice(1).join(" "));
        break;
      case "exit":
        rl.close();
        return;
      default:
        console.log(`${answer}: command not found`);
    }
    
    askQuestion();
  });
}

askQuestion();
