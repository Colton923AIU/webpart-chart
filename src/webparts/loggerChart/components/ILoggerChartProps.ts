import { SPHttpClient } from "@microsoft/sp-http";

export interface ILoggerChartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spListLink: string;
  absoluteUrl: string;
  spHttpClient: SPHttpClient;
}
