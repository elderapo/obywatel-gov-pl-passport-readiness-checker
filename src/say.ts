import { execPromise, sleep } from "./utils";

const _say = async (text: string): Promise<void> => {
  await execPromise(
    `echo "${text}" | iconv -f UTF-8 -t ISO_8859-2 | festival --tts --language polish`
  );
};

export const say = async (text: string): Promise<void> => {
  console.log(`Saying: "${text}"...`);

  const sentences = text.split(/\,|\./);

  // Make a 200 ms pause instead of saying "dot", "comma"
  for (let sentence of sentences) {
    await _say(sentence);
    await sleep(200);
  }

  await sleep(100);
};

export const playStateChangedSound = async () =>
  await say(
    "Status się zmienił " +
      Array(50)
        .fill("łiiii jooo łiiii joo")
        .join(" ")
  );
