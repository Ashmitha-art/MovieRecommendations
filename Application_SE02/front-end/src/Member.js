import ashmitha_photo from "./photos/ashmitha.jpg";
import steve_photo from "./photos/steve.png";
import preet_photo from "./photos/preet.jpg";
import chris_photo from "./photos/chris.jpg";
import abdul_photo from "./photos/abdul.jpg";
import nathan_photo from "./photos/nathan.jpg";

function Member({ name }) {
  let ashmitha_text =
    "Hey! I'm Ashmitha Pais, an MS student at SFSU. I've always been fascinated by computers, data and their intricacy. I enjoy reading and fixing problems. \n In my free time, I listen to a lot of music. I would like to work on real issues and help develop products that make people's lives easier." +
    " Working with diverse talented individuals helps me grow, challenges me and evolves my perspective.";
  let steve_text =
    "I work in both client-facing and product roles for technology companies. " +
    "I specialize in leveraging my software background, passion for technology, and empathy for customers to build loyal relationships and deliver meaningful products. " +
    "Strong affinity for lean environments and iterating products.";
  let preet_text =
    "Hi, my name is Preet Dhaliwal. I am a Computer Science Student at SFSU " +
    "pursuing my Bachelor's Degree. I also help manage service location data as a SWE Intern at TDS Telecom." +
    "I enjoy learning about new tech and endlessly watching youtube videos.";
  let chris_text =
    "Hi, I'm Chris Farnsworth. " +
    "I'm pursuing my Bachelor's Degree in Computer Engineering at San Francisco State University. " +
    "My experience is mainly in real-time embedded systems; My past projects have focused on audio signal processing and pattern recognition, and I am currently working on an environmental control systems project. " +
    "I have also worked on software projects, mainly a system that provides playlist management and analytical tools for radio deejays and producers.";
  let abdul_text =
    "Hi, I'm Abdul Barrie, a Computer Science major currently attending San Francisco State University. " +
    "I used to read and write a lot as a child, then I discovered computers and video games and my life went downhill from there. " +
    "…JK! Jokes aside, I've been interested in computers ever since I was young, which was what led me to want to join the CS " +
    "field when I grew up. Outside of coding, I enjoy literature, writing short stories and listening to music.";
  let nathan_text =
    "Hi, my name is Nathan Loo. " +
    "I'm a Computer Science student at San Francisco State University currently studying for a Bachelor's degree. " +
    "I was born and raised in San Francisco and from a young age I was fascinated with technology. " +
    "I've been using computers my whole life so the computer science track seemed right for me. " +
    "I hope to be able to become a software engineer in the future after completing my degree. ";

  let photo = "";
  let text = "";

  switch (name) {
    case "Ashmitha Pais":
      photo = ashmitha_photo;
      text = ashmitha_text;
      break;
    case "Abdul Barrie":
      photo = abdul_photo;
      text = abdul_text;
      break;
    case "Chris Farnsworth":
      photo = chris_photo;
      text = chris_text;
      break;
    case "Nathan Loo":
      photo = nathan_photo;
      text = nathan_text;
      break;
    case "Preet Dhaliwal":
      photo = preet_photo;
      text = preet_text;
      break;
    case "Steve Betts":
      photo = steve_photo;
      text = steve_text;
      break;
    default:
      console.log("Unknown member.");
  }

  return (
    <div className="info-container">
      <img className="info-photo" src={photo} alt={name} />

      <h3 className="heading"> {name} </h3>

      <p className="info-text">{text}</p>
    </div>
  );
}

export default Member;
