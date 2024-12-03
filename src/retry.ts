import * as core from '@actions/core';
export async function execWithRetry(fn: () => Promise<number>, retryCount: number): Promise<number> {
  let attempt = 0;
  let result = 1;
  while (attempt <= retryCount && result !== 0) {
    if (attempt > 0) {
      console.log(`Retry attempt ${attempt}. (exit code was ${result})`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    result = await fn();
    core.info(`Attempt ${attempt} completed with exit code ${result}`);
    attempt++;
  }
  return result;
}
