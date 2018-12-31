import { execPromise, sleep } from "./utils";

export const say = async (text: string): Promise<void> => {
  console.log(`Saying: "${text}"...`);
  await execPromise(
    `echo "${text}" | iconv -f UTF-8 -t ISO_8859-2 | festival --tts --language polish`
  );
  await sleep(100);
};

export const playStateChangedSound = async () =>
  await say(
    "Status się zmienił " +
      Array(50)
        .fill("łiiii jooo łiiii joo")
        .join(" ")
  );
