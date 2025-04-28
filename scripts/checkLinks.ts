import { runLinkCheck } from '../src/utils/linkChecker';

const main = async () => {
  try {
    await runLinkCheck();
  } catch (error) {
    console.error('Error running link checker:', error);
    process.exit(1);
  }
};

main();
