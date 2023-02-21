function Member({name, photo}){
    return (
        <div class="info-container">
            <img class="info-photo" src={photo} alt={name}/>
            
            <h3 class="heading"> {name} </h3> 
            
            <p class="info-text"> 
                Hi, I'm Abdul Barrie, a Computer Science major currently attending San Francisco State University. 
                I used to read and write a lot as a child, then I discovered computers and video games and my life went downhill from there.
                …JK! Jokes aside, I've been interested in computers ever since I was young, which was what led me to want to join the CS 
                field when I grew up. Outside of coding, I enjoy literature, writing short stories and listening to music.
 
            </p>
        </div>
    );
}

export default Member;