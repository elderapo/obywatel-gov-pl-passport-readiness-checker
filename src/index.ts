require("dotenv").config({});

import {
  ObywatelGOVPLAPI,
  ObywatelGOVPLSPassportReadinessStates
} from "./ObywatelGOVPLAPI";
import { sleep } from "./utils";
import { say, playStateChangedSound } from "./say";

const main = async () => {
  const caseNumber = parseInt(process.env.CASE_NUMBER);
  const checkInterval = parseInt(process.env.CHECK_INTERVAL) || 1000;

  if (Number.isNaN(caseNumber)) {
    throw new Error("Set CASE_NUMBER in ENV!");
  }

  console.log(`Case number: ${caseNumber}`);
  console.log(`Going to be checking each ${checkInterval} ms...`);

  let previousState: ObywatelGOVPLSPassportReadinessStates = null;
  let tryNumber = 0;

  while (true) {
    try {
      const results = await ObywatelGOVPLAPI.checkCase(caseNumber);

      for (let result of results) {
        console.log(
          `[${tryNumber++}][${new Date().toString()}]: ${result.status}`
        );
        if (
          result.status !==
          ObywatelGOVPLSPassportReadinessStates.ApplicationAccepted
        ) {
          await say(result.status);
        }

        if (previousState !== null && previousState !== result.status) {
          await playStateChangedSound();
        }

        previousState = result.status as ObywatelGOVPLSPassportReadinessStates;
      }
    } catch (ex) {}

    console.log(`Performing next check in ${checkInterval} ms...`);

    await sleep(checkInterval);
  }
};

main();
