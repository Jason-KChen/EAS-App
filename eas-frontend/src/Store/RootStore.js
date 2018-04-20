import UIStore from "./uiStore"
import MainMapStore from "./MainMapStore"
import ManagementStore from "./ManagementStore"

class RootStore {
  constructor () {
    this.uiStore = new UIStore(this)
    this.mainMapStore = new MainMapStore(this)
    this.managementStore = new ManagementStore(this)
  }
}

export default RootStore