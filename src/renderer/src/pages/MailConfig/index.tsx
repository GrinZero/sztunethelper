import LoginForm from './LoginForm'

const MailConfig = () => {
  const handleSubmit = ({ mail, pass }) => {
    console.log('mail,pass', mail, pass)
  }

  return (
    <div className={`main flex-col items-center`}>
      <LoginForm className={`w-[600px] mt-12`} onSubmit={handleSubmit} />
    </div>
  )
}

export default MailConfig
