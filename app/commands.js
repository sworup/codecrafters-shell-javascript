import { delimiter, join } from "path";
import fs from "fs";

const buitinCommands = (rl) => {
  const echo = ([_command, ...args] = []) => {
    console.log(args.join(" "));
  };

  const type = ([_command, ...args] = []) => {
    for (const key in commands) {
      if (args[0] === key) {
        console.log(`${key} is a shell builtin`);
        return;
      }
    }

    const pathVar = process.env.PATH || "";
    const paths = pathVar.split(delimiter);
    for (const p of paths) {
      const fullPath = join(p, args[0]);
      try {
        fs.accessSync(fullPath, fs.constants.F_OK | fs.constants.X_OK);
        console.log(`${args[0]} is ${fullPath}`);
        return;
      } catch (err) {}
    }

    console.log(`${args[0]}: not found`);
  };

  const exit = () => {
    rl.close();
  };
  
  return { echo, type, exit };
};

export default buitinCommands;
