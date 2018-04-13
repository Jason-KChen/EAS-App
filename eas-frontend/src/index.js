import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'mobx-react'
import RootStore from './Store/RootStore'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Provider rootStore={new RootStore()}>
  <App />
</Provider>, document.getElementById('root'))
registerServiceWorker()
