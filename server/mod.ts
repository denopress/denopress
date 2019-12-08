import { ThemeServer } from "./../core/theme/mod.ts";
import { TypeDenopressConfig } from "./../core/types.ts";
import controllerTodoList from "./controller/todo_list.ts"; 
import { createPortalControllerFrontMap } from "./controller/mod.ts";

const HOT_LOADING = true;

export function createPortalServer(config: TypeDenopressConfig, opts: { baseDir: string }) {
  const portalServer = new ThemeServer(`127.0.0.1:${config.portalServer.port}`, {
    path: opts.baseDir,
    themeList: config.portalThemes.map((item) => {
      return item.name;
    }),
    controllerFrontAPI: {
      todoList: {
        getData: {
          method: 'GET',
          action: controllerTodoList.getData,
        }
      },
    },
    controllerServerAPI: {
      todoList: controllerTodoList,
    },
    hotLoading: HOT_LOADING,
  });
  return portalServer;
}


export function createAdminServer(config: TypeDenopressConfig, opts: { baseDir: string }) {
  const adminServer = new ThemeServer(`127.0.0.1:${config.adminServer.port}`, {
    path: opts.baseDir,
    themeList: config.adminThemes.map((item) => {
      return item.name;
    }),
    controllerFrontAPI: createPortalControllerFrontMap(config),
    controllerServerAPI: {
      todoList: controllerTodoList,
    },
    hotLoading: HOT_LOADING,
  });
  return adminServer;
}
