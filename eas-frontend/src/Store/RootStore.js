import UIStore from "./uiStore"
import MainMapStore from "./MainMapStore"
import ManagementStore from "./ManagementStore"
import {DetailedInfoStore} from "./DetailedInfoStore"

class RootStore {
  constructor () {
    this.uiStore = new UIStore(this)
    this.mainMapStore = new MainMapStore(this)
    this.managementStore = new ManagementStore(this)
    this.detailedInfoStore = new DetailedInfoStore(this)
  }
}

export default RootStore