const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question("$ ", (answer) => {
    if(answer === "exit") {
      rl.close();
      return;
    }
    console.log(`${answer}: command not found`);
    askQuestion();
  });
}

askQuestion();
