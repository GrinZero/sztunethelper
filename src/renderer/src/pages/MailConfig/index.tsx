import LoginForm from './LoginForm'

const MailConfig = () => {
  const handleSubmit = () => {}

  return (
    <div className={`main flex-col items-center`}>
      <LoginForm className={`w-[600px]`} onSubmit={handleSubmit} />
    </div>
  )
}

export default MailConfig
