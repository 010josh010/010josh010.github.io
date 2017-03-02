//getting the project bin to place the projects into 
var projectBin = document.getElementById('project-bin'); 

//projects to be appended to the page 
var projects = [
    
    {
        name: 'Hangout-Simulator',
        img: {
            src:'img/hangoutsimulator.gif'
        },
        info: 'A Chatting application built with React.js, Node, Express, Socket.io and MongoDB. The UI of this applicaiton is styled and themed after the <a href="https://yanderesimulator.com/about/" target="_blank">Yandere Simulator</a> Video game developed by <a href="https://yanderedev.wordpress.com/" target="_blank">Yanderedev.</a> You can use the app via a test account <span> username: test password: 12345678 </span>',
        url: 'http://hangout-simulator-010josh010.herokuapp.com/'
    }, 
    
    {
        name: 'Crunchy-Scraper',
        img: {
            src:'img/crunchyscraper.gif'
        },
        info: 'A Node.js Scraping applicaiton that Collects news articles from <a href="http://www.crunchyroll.com/ target="_blank">crunchyroll.com</a>. Built with JQuery, Node , Express, and MongoDB.',
        url: 'https://crunchyscraper-010josh010.herokuapp.com/'
    }, 
    
    {
        name: 'Nutrimon',
        img: {
            src:'img/nutrimon2.gif'
        },
        info: 'Nutrimon is a free platform for eating healthier and calculating nutrition. Character images are by <a href="http://us.tamagotchifriends.com/characters/" target="_blank">© Bandai - All rights reserved</a> but are there as placeholders for a proof of concept. The idea is based on the old ©Tamagatchi games that would allow you to feed a digital pet. This application is built using Javascript/JQuery/CSS, and is using Firebase to store the users information',
        url: 'https://nutrimon-team-nurtrimon.herokuapp.com/'
    }, 
    
    {
        name: 'DBZ-Battler',
        img: {
            src:'img/dbzbattler.gif'
        },
        info: 'Dragonball Z is an anime created by Akira Toriyama that I grew up watching and still love to this day. I decided to build a turn based battle game built in Javascript/JQuery/CSS',
        url: 'https://dbz-battler-010josh010.herokuapp.com/'
    }, 
    
    {
        name: 'Hangman',
        img: {
            src:'img/hangman.gif'
        },
        info: 'This is a hangmangame built for the browser with multiple categories and theme music. This was one of the first homework projects that I built at the Coding Bootcamp at UNC-Chapel-Hill.',
        url: 'https://hangman-javascript-010josh010.herokuapp.com/'
    },
    
    {
        name:'MatchPlusPlus',
        img: {
            src:'img/matchplusplus2.gif'
        },
        info: 'A friend finding and dating application built in AngularJS , Node, Express, and Redis Database. Not currently deployed as it is still in development but feel free to download the source and run it locally. Requires installation of redis server',
        url: 'https://github.com/010josh010/matchPlus-Plus'
    }
]

projects.forEach(function(project){
    var div = document.createElement('div'); 
    //assigning class
    div.className = 'project';
    //assigning id value based on the projects name 
    div.id = project.name; 
    
    var title = document.createElement('h3'); 
    
    title.innerHTML = project.name;
    
    //var loadingIcon = document.createElement('i');
    //loadingIcon.className = 'loading-icon fa fa-spinner fa-pulse fa-lg';
    
    //for img wrapper 
    var imgWrapper  = document.createElement('a');
    imgWrapper.href= project.url;
    imgWrapper.target = "_blank";
     //for handling of the img 
    var img = new Image();
    
    imgWrapper.appendChild(img);
    
    //for adding the article  
    var article = document.createElement('article');
    var p = document.createElement('p');
     
    //setting the innerhtml to the projects information text
    p.innerHTML = project.info; 
    
    //link to the project
    var link  = document.createElement('a');
    
    //setting the href of the a tag to the project's url property
    link.href = project.url; 
    link.className = 'project-link';
    
    link.innerHTML = 'See '+ project.name + ' in action';
    
    link.target = '_blank'
    
    //appends to the article 
    article.appendChild(p);
    article.appendChild(link); 
     
    
    //appends to the container div 
    div.appendChild(title);
    div.appendChild(imgWrapper);
    //div.appendChild(loadingIcon);
    //image goes here 
    div.appendChild(article); 
    
    
    //appends to the project bin 
    projectBin.appendChild(div); 
    
    var preloadedImg = new Image();
    preloadedImg.src = project.img.src;
   
    preloadedImg.onload = function(){
        //remove the spinner 
        img.src= project.img.src;
        
    }
    
    
    
})


console.log(projectBin.childNodes)
