import UIStore from "./uiStore"
import MainMapStore from "./MainMapStore"
import ManagementStore from "./ManagementStore"
import {DetailedInfoStore} from "./DetailedInfoStore"
import AnalyticalStore from "./AnalyticalStore"
import AuthenticationStore from "./AuthenticationStore"

class RootStore {
  constructor () {
    this.uiStore = new UIStore(this)
    this.mainMapStore = new MainMapStore(this)
    this.managementStore = new ManagementStore(this)
    this.detailedInfoStore = new DetailedInfoStore(this)
    this.analyticalStore = new AnalyticalStore(this)
    this.authenticationStore = new AuthenticationStore(this)
  }
}

export default RootStore