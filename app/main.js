const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = {
  echo: ([_command, ...args] = []) => {
    console.log(args.join(" "));
  },
  type: ([_command, ...args] = []) => {
    for (const key in commands) {
      if (args[0] === key) {
        console.log(`${key} is a shell builtin`);
        return;
      }
    }

    const pathVar = process.env.PATH || "";
    const paths = pathVar.split(path.delimiter);
    for (const p of paths) {
      const fullPath = path.join(p, args[0]);
      try {
        require("fs").accessSync(fullPath);
        console.log(`${args[0]} is ${fullPath}`);
        return;
      } catch (err) {
      }
    }


    console.log(`${args[0]}: not found`);
  },
  exit: () => {
    rl.close();
  }
};

function askQuestion() {
  rl.question("$ ", (answer) => {
    const commandArr = answer.trim().split(" ");
    for (const [key, func] of Object.entries(commands)) {
      if (commandArr[0] === key) {
        func(commandArr);
        if(key !== "exit") askQuestion();
        return;
      }
    }
    
    console.log(`${commandArr[0]}: command not found`);
    askQuestion();
  });
}

askQuestion();
