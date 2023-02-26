import backdarkMp4 from '../../assets/mp4/back-dark.mp4'
import './videobg.scss'

export const VideoBg = () => {
  return (
    <div className="video-bg">
      <video
        autoPlay
        muted
        loop
        className="back-video w-[100vw] h-[100vh] absolute left-0 top-0 -z-50 object-cover mix-blend-multiply"
      >
        <source src={backdarkMp4} type="video/mp4" />
      </video>
    </div>
  )
}

export default VideoBg
