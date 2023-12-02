import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail__container border">
      <div className="mail    ">
        <h1 className="mailTitle">Save time, save money!</h1>
        <span className="mailDesc">Sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Your Email" />
          <button className="btn__subcribe">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default MailList