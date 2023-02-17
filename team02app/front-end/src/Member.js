function Member({name, photo}){
    return (
        <div class="info-container">
            <img class="info-photo" src={photo} alt={name}/>
            
            <h3 class="heading"> {name} </h3> 
            
            <p class="info-text"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas egestas ante nulla. 
                Duis feugiat dolor eu dui elementum mollis. Vestibulum vitae erat enim. 
                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                Morbi quis tincidunt ante. In sollicitudin eu urna sed dignissim. Curabitur id diam ut 
                arcu malesuada elementum ac eu enim. Nunc feugiat elit sit amet dui euismod, sit amet mollis lacus volutpat. 
                Donec fermentum sem quis ex maximus pharetra. Vivamus porttitor dapibus mauris at viverra. 
                Nullam finibus sapien suscipit nibh gravida, sit amet imperdiet elit mattis. 
                Morbi turpis neque, pulvinar ut convallis nec, fringilla quis ligula. Vivamus ut tempor dolor. 
                Aliquam scelerisque lacinia pretium. Aenean et tellus quis arcu pharetra fringilla. 
                Phasellus dictum metus quis eros blandit commodo.  
            </p>
        </div>
    );
}

export default Member;