import { cookie } from "./../../deps.ts";

export interface TypeThemePressConfig {
  name: string;
  version: string;
  pages: string[];
}

export interface TypeThemeConfig {
  name: string;
  version?: string;
  configLink: string;
}


export interface TypeThemePageControllerDataOpts {
  api?: TypeThemeControllerAPI;
}

export interface TypeThemePageControllerOnLoadContext {
  getUrlParams(): Promise<{[key: string]: string}>
}

export interface TypeThemePageControllerOnLoadApp {
  api?: {[key: string]: {[key: string]: Function}}|undefined
}

export interface TypeThemePageController {
  onLoad(ctx?: TypeThemePageControllerOnLoadContext, api?: TypeThemePageControllerOnLoadApp): Promise<boolean>;
  data(ctx?: TypeThemePageControllerOnLoadContext, api?: TypeThemePageControllerOnLoadApp): Promise<{[key: string]: any;}>;
}

export interface TypeThemePageScript {
  path: string;
  template: Function;
  controller: TypeThemePageController;
}

export interface TypeTheme {
  config: TypeThemePressConfig;
  pageScriptMap: Map<string, TypeThemePageScript>;
}


export interface TypeThemeLoader {
  reset(): Promise<TypeThemePressConfig>
  reloadTheme(): Promise<TypeTheme>;
  reloadThemePage(page: string): Promise<TypeThemePageScript>;
  reloadConfig(): TypeThemePressConfig;

  hasConfig(): boolean;
  getConfig(): TypeThemePressConfig|undefined;
  exist(): boolean;
  existPage(page: string): boolean;
  hasPage(page: string): boolean;
  getPage(page: string): TypeThemePageScript|undefined;
}


export interface TypeThemeLoaderOpts {
  path: string;
}

export interface TypeThemeLoaderHubOpts {
  basePath: string;
  themeList: string[];
}

export interface TypeThemeLoaderHub {

  resetAllThemes(): Promise<void>
  existTheme(theme: string): boolean;
  existThemePage(theme: string, page: string): boolean;
  hasTheme(theme: string): boolean;
  hasThemePage(theme: string, page: string): boolean;
  getThemePage(theme: string, page: string): TypeThemePageScript|undefined;
  addTheme(theme: string): void;
  reloadThemePage(theme: string, page: string): Promise<TypeThemePageScript|undefined>
}


export interface TypeThemeServerContext {
  getUrlParams(): {[key: string]: string};
  getBodyParams(): Promise<{[key: string]: string}>;
  getCookies(): cookie.Cookies;
  setCookie(cookie: cookie.Cookie): void;
  deleteCookie(name: string): void;
  redirect(url: string): void;
}

export interface TypeThemeServerOpts {
  path: string;
  themeList?: string[];
  controllerFrontAPI?: TypeThemeControllerFrontAPI;
  controllerServerAPI?: TypeThemeControllerAPI;
  hotLoading?: boolean;
}


export interface TypeThemeFrontAPI {
  [key: string]: {
    method: string;  //  GET|POST|PUT|PATCH
    action: Function;
  };
}

export interface TypeThemeControllerFrontAPI {
  [key: string]: TypeThemeFrontAPI
}

export interface TypeThemeControllerAPI {
  [key: string]: TypeThemeAPI
}

export interface TypeThemeAPI {
  [key: string]: Function;
}

export interface TypeReadPageResult {
  status: number;
  content: string;
}


export interface TypeRemoteThemeLoaderOpts {
  baseDir: string;
}

export interface TypeRemoteThemeLoader {
  loadRemoteTheme(config: TypeThemeConfig): Promise<void>;
}

export interface TypeRemoteThemeLoaderTaskContext {
  index: number;
  count: number;
  remoteFileLinkList: string[]
}