import './App.css'
import { useEffect } from 'react'
import { Plugins } from '@capacitor/core'
const { LocalNotifications } = Plugins

const notify = () => LocalNotifications.schedule({
  notifications: [{
    title: "Oh!",
    body: "It's a notification!",
    id: new Date().getTime(),
    sound: null,
    attachments: null,
    actionTypeId: "",
    extra: null
  }]
})

function App() {
  useEffect(() => {
    LocalNotifications.requestPermission()
  }, [])

  return (
    <div className="App">
      <button onClick={notify}>What in Oblivion is that?!</button>
    </div>
  )
}

export default App;
