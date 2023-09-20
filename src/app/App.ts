import { AppConfig } from "./AppConfig"
import { AppHome } from "./AppHome"
import { AppReplEventHandler } from "./AppReplEventHandler"

export class App {
  home = new AppHome()
  config = new AppConfig()
  replEventHandler = new AppReplEventHandler()
}
