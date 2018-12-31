require("dotenv").config({});

import { ObywatelGOVPLAPI } from "./ObywatelGOVPLAPI";

const main = async () => {
  const caseNumber = parseInt(process.env.CASE_NUMBER);

  if (Number.isNaN(caseNumber)) {
    throw new Error("Set CASE_NUMBER in ENV!");
  }

  const cases = await ObywatelGOVPLAPI.checkCase(caseNumber);

  console.log("cases", cases);
};

main();
