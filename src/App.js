import './App.css'
import { Plugins } from '@capacitor/core'
const { LocalNotifications } = Plugins

const notify = () => LocalNotifications.schedule({
  notifications: [{
    title: "Oh!",
    body: "It's a notification!",
    id: 1,
    sound: null,
    attachments: null,
    actionTypeId: "",
    extra: null
  }]
})

function App() {
  return (
    <div className="App">
      <button onClick={notify}>What in Oblivion is that?!</button>
    </div>
  )
}

export default App;
