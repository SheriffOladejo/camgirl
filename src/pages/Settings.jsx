import LeftBar from '../components/LeftBar'
import Header from '../components/Header'
import SettingsComponent from '../components/SettingsComponent'
import AccountSettings from '../components/AccountSettings'
function Settings() {
  return (
    <section className='w-[100%] '>
      <Header/>
    <div className='grid gap-4 grid-cols-2 md:grid-cols-3 md:px-16 h-[100vh] bg-color-lightGrey '>
      <LeftBar  className={`col-span-1 w-[80%]`}  />
    <SettingsComponent className={`col-span-1`}/>
    <AccountSettings className={`col-span-1`}/>
    </div>
    </section>
  )
}

export default Settings