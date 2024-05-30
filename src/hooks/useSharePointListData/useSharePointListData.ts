import { SPHttpClient, type SPHttpClientResponse } from "@microsoft/sp-http";
import * as React from "react";
import { getURL } from "../../utils/SPListLinkParser";

export type TSPListData = Record<string, string>[];
export interface ISPListData {
  client: SPHttpClient;
  spListLink: string;
  absoluteUrl: string;
}

/*
    Purpose: When a user copy and paste's their SP List,
    this hook will return access to the data via setState.
*/

const useSharePointListData: ({
  client,
  spListLink,
  absoluteUrl,
}: ISPListData) => [TSPListData | null] = ({
  spListLink,
  absoluteUrl,
  client,
}: ISPListData) => {
  const [listData, setListData] = React.useState<TSPListData | null>(null);

  const getSPListData = async (url: string) => {
    if (!url) return;
    if (url.length < 3) return;
    try {
      const data = await client
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        });
      if (data) {
        // todo: Pass a 'cleanse-data' function to this hook.
        setListData(data);
        // setListData(cleanData);
        return;
      }
    } catch (e) {
      console.log("Response from SP List Getter Failed");
      console.log("error: ", e);
      return;
    }
  };

  React.useEffect(() => {
    if (absoluteUrl && spListLink) {
      const url = getURL({ absoluteUrl: absoluteUrl, spListLink: spListLink });
      if (url) {
        getSPListData(url);
      }
    }
  }, [spListLink, absoluteUrl]);

  return [listData];
};

export default useSharePointListData;
