
import getopt from './getopt.js';

const appSchema = getopt.create([
  ['h', 'help', 'show this help content']
]);
const ACTIONS = {
  init: {
    description: "init target directory (default current) as a wlcr micro-front-end",
    schema: [
      ['n', 'app-name', 'the app name to initialize']
    ]
  }
};
const args = process.argv.slice(2);

let appArgs = [], action = "";
while (args.length) {
  if (args[0].charAt(0) === "-") {
    appArgs.push(args.shift());
  } else {
    action = args.shift();
    break;
  }
}

function showAppHelp() {
  appSchema.showHelp('wlcr-mfe');
  console.log("\nSupported actions:");
  Object.entries(ACTIONS).forEach(([action, schema]) => {
    console.log(`\t${action}\t${schema.description}`);
  });
}

const appOptions = appSchema.parse(appArgs);
if (appOptions.options.help) {
  showAppHelp();
  process.exit(0);
}

if (!action) {
  console.error("No action specified\n");
  showAppHelp();
  process.exit(0);
}

if (!ACTIONS[action]) {
  console.error(`Unknown action: ${action} \n`);
  showAppHelp();
  process.exit(1);
}

const actionSchema = getopt.create(ACTIONS[action].schema).bindHelp(`wlcr-mfe ${action}`);

const actionOptions = actionSchema.parse(args);

if (appOptions.options.help) {
  actionSchema.showHelp();
  process.exit(0);
}

export default { appOptions, action, actionOptions };
