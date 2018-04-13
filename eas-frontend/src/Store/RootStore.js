

import UIStore from "./uiStore"

class RootStore {
  constructor () {
    this.uiStore = new UIStore(this)
  }
}

export default RootStore