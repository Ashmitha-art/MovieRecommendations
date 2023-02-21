function Member({name, photo, text}){
    return (
        <div class="info-container">
            <img class="info-photo" src={photo} alt={name}/>

            <h3 class="heading"> {name} </h3>

            <p class="info-text">
                { text }
            </p>
        </div>
    );
}

export default Member;
