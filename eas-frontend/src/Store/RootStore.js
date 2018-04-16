import UIStore from "./uiStore"
import MainMapStore from "./MainMapStore"

class RootStore {
  constructor () {
    this.uiStore = new UIStore(this)
    this.mainMapStore = new MainMapStore(this)
  }
}

export default RootStore