import * as rp from "request-promise";

export interface ObywatelGOVPLCase {
  kodStatusu: string;
  error: boolean;
  status: string;
  nrWniosku: string;
}

export class ObywatelGOVPLAPI {
  private static CHECK_PASSPORT_REDINESS_URL =
    "https://obywatel.gov.pl/wyjazd-za-granice/sprawdz-czy-twoj-paszport-jest-gotowy";

  private static getFinalUrlFromHTML(html: string) {
    return html
      .match(/(?<=gotowoscPaszportuRestUrl=")(.*)(?=";var)/)[0]
      .replace(":443", "");
  }

  private static getAuthTokenFromFinalUrl(finalUrl: string) {
    return finalUrl
      .split("")
      .reverse()
      .join("")
      .split("=")[0]
      .split("")
      .reverse()
      .join("");
  }

  public static async checkCase(
    caseNumber: number
  ): Promise<ObywatelGOVPLCase[]> {
    const jar = rp.jar();

    const html: string = await rp.get({
      url: this.CHECK_PASSPORT_REDINESS_URL,
      jar
    });

    const finalUrl = this.getFinalUrlFromHTML(html);
    const authToken = this.getAuthTokenFromFinalUrl(finalUrl);

    const res = await rp.post({
      url: finalUrl,
      json: true,
      jar,
      form: {
        _Gotowoscpaszportu_WAR_Gotowoscpaszportuportlet_nrSprawy: caseNumber,
        _Gotowoscpaszportu_WAR_Gotowoscpaszportuportlet_p_auth: authToken
      }
    });

    return res;
  }
}
