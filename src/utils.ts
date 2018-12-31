import { promisify } from "bluebird";
import { exec } from "child_process";

export const sleep = async (ms: number) => {
  return new Promise(resolve => {
    return setTimeout(resolve, ms);
  });
};

export const execPromise = promisify(exec);
