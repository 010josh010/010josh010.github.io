//getting the project bin to place the projects into 
var projectBin = document.getElementById('project-bin'); 


// returns version of IE or false, if browser is not Internet Explorer
var detectIE = function() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

// Get IE or Edge browser version
var version = detectIE();

if (version === false) {
  console.log('you are using a modern browser')
} else if (version >= 12) {
  console.log('you are using edge or ie12')
} else {
  console.log('you are using ie 11 and below')
}


//ajax promise call for projects
var getJSON = function(url) {
    return new Promise(function(res, rej){
        var xhr = new XMLHttpRequest(); 
        xhr.open('get' , url , true); 
        xhr.responseType = 'json'; 
        xhr.onload = function(){
            var status = xhr.status; 
            if(status == 200) {
                res(xhr.response); 
            } else {
                rej(status); 
            }
        }; 
        xhr.send(); 
    })
}; 



getJSON('projects.json')
    .then(function(data) {
    
        //projects to be appended to the page 
        var projects  = data.projects;  
        //for handling of projects
        projects.forEach(function(project){
        var div = document.createElement('div'); 
        //assigning class
        div.className = 'project';
        //assigning id value based on the projects name 
        div.id = project.name; 

        var title = document.createElement('h3'); 

        title.innerHTML = project.name;

        //for img wrapper 
        var imgWrapper  = document.createElement('a');
        imgWrapper.href= project.url;
        imgWrapper.target = "_blank";

         //for handling of the loading spinner 
        var loadingImg = new Image();
        loadingImg.className = 'loading-icon'; 
        loadingImg.src = 'img/ring.gif'; 

        imgWrapper.appendChild(loadingImg);

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
        link.target = '_blank';

        //appends to the article 
        article.appendChild(p);
        article.appendChild(link); 


        //appends to the container div 
        div.appendChild(title);
        div.appendChild(imgWrapper);
    
        //image goes here 
        div.appendChild(article); 


        //appends to the project bin 
        projectBin.appendChild(div); 

        var preloadedImg = new Image();
        preloadedImg.src = project.img.src;

        preloadedImg.onload = function(){
            //set the class of the img
            loadingImg.className = 'project-img'; 
            //remove the spinner 
            loadingImg.src= project.img.src;

        }

    })

})