const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event for the new button
const themeToggleButton = document.getElementById('themeToggleButton');
const themeToggleIcon = document.getElementById('themeToggleIcon');

themeToggleButton.addEventListener('click', function () {
  const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLightTheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleIcon.src = 'assets/sun.svg'; // Change to sun icon for dark theme
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleIcon.src = 'assets/moon.svg'; // Change to moon icon for light theme
    localStorage.setItem('theme', 'light');
  }
});

// Set the default theme to dark when the page loads
document.addEventListener('DOMContentLoaded', function () {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggleIcon.src = savedTheme === 'dark' ? 'assets/sun.svg' : 'assets/moon.svg';
});

// Save user preference on load
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    themeToggleIcon.src = 'assets/sun.svg'; // Set sun icon if dark theme is active
  } else {
    themeToggleIcon.src = 'assets/moon.svg'; // Set moon icon if light theme is active
  }
}

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

function showExperience(projectType) {
  const experienceContainer = document.getElementById('experience-container');

  // Check if the same project type is clicked to toggle visibility
  const existingActiveItem = document.querySelector('.experience-item.active');
  if (existingActiveItem && existingActiveItem.dataset.projectType === projectType) {
    existingActiveItem.classList.remove('active');
    setTimeout(() => existingActiveItem.style.display = 'none', 500); // Delay for the animation to complete
    return;
  }

  // Clear previous experiences if a different project type is clicked
  if (existingActiveItem) {
    existingActiveItem.classList.remove('active');
    setTimeout(() => {
      existingActiveItem.style.display = 'none';
      loadExperiences(projectType);
    }, 500); // Delay for the animation to complete
  } else {
    loadExperiences(projectType);
  }
}

function loadExperiences(projectType) {
  const experienceContainer = document.getElementById('experience-container');
  let experiences = [];

  if (projectType === 'embedded') {
    experiences = [
      {
        title: 'Autonomous Pipe Inspection Robot',
        description: 'Developed a real-time C++ system on a Raspberry Pi for crack detection and 3D point cloud mapping using an OAK-D stereo camera, optimizing YOLOv11 for image processing, implementing robot system control in ROS2.',
        imgSrc: './assets/FYDP.png',
        tools: '#C++ #OpenCV #Raspberry Pi #Stereo Cameras #ROS2',
      },
      {
        title: 'Real-Time Executive (RTX) System Implementation',
        description: 'Developed a multi-programming environment with priority-based scheduling, preemption, memory management, inter-task communication, privilege mode support, and console I/O capabilities.',
        imgSrc: './assets/RTX.png',
        tools: '#C #RTOS #Intel_DE1_SoC'
      },
      {
        title: 'Smart OBD2 Diagnostic & Optimization Tool',
        description: 'Engineered a Bluetooth-enabled vehicle diagnostics system that collects OBD-II data via an ELM327 adapter and ESP32, performing local ML-based anomaly detection and optimization suggestions, with live visualization through an Android app.',
        imgSrc: './assets/scanner.png',
        tools: '#C++ #ESP32 #Bluetooth #Android #OBD2 #PyTorch ',
      },
      {
        title: 'Embedded Audio Player',
        description: 'Engineered an embedded audio player utilizing the FatFS file system for audio file processing in C that integrated push buttons with timer interrupt handling for playback control and LCD interfacing.',
        imgSrc: './assets/audio.png',
        tools: '#C #AudioProcessing #Altera_Nios_II_FPGA',
      }
    ];
  } else if (projectType === 'web-development') {
    experiences = [
      {
        title: 'Motive App',
        description: 'Developed a mobile app to connect individuals hosting local sporting events with players using an MVC architecture, data persistence, and integrated Google Maps API for real-time location tracking.',
        imgSrc: './assets/android.png',
        tools: '#Android #Kotlin #NoSQL',
        githubLink: 'https://github.com/VarunShroff/Motive'
      },
      {
        title: 'Chrome Arcade',
        description: 'Developed a browser extension for playing classic arcade games, featuring enhanced interaction detection and persistent score tracking, with optimized user controls for a seamless gaming experience.',
        imgSrc: './assets/icon48.png',
        tools: '#JavaScript #HTML5 #CSS3',
        githubLink: 'https://github.com/VarunShroff/ChromeArcade'
      },
      {
        title: 'InstaConnect',
        description: 'Designed a full-stack social media web application to allow interaction with posts through likes and comments, incorporating user authentication with encryption, secure email validation, and data storage.',
        imgSrc: './assets/insta.png',
        tools: '#MongoDB #Express #React #Node.js #GraphQL #Heroku',
        githubLink: 'https://github.com/VarunShroff/InstaConnect'
      }
    ];
  } else if (projectType === 'ai/ml') {
    experiences = [
      {
        title: 'Formula 1 Race Outcome Predictor',
        description: 'Built an end-to-end machine learning pipeline for predicting Formula 1 race outcomes using CUDA-accelerated PyTorch models, cloud-hosted data pipelines, and a web dashboard for result visualization and analysis.',
        imgSrc: './assets/racing-car.png',
        tools: '#PyTorch #CUDA #FastAPI #GCP',
      },
      {
        title: 'Augmented Reality Car Repair Assistant',
        description: 'Developed a Python-based vision system that identifies automotive engine components using image classification and provides repair instructions through speech output, designed to aid beginners in understanding engine bays.',
        imgSrc: './assets/ar_car_repair_glasses.png',
        tools: '#Python #OpenCV #TTS',
      },
      {
        title: 'Mood Music Generator',
        description: 'Implemented chatbot to analyze prompts, detect emotions, and produce personalized musical pieces through encoders, decoders, semantic analysis, and generative adversarial networks.',
        imgSrc: './assets/music.png',
        tools: '#PyTorch #Python #Sentiment_Analysis #Neural_Networks'
      }
    ];
  } else if (projectType === 'miscellaneous') {
    experiences = [
      {
        title: 'Hybrid Vehicle Auto-Parking',
        description: 'Designed an automatic parking system using sensor fusion and control algorithms, enabling the vehicle to autonomously detect and park in available spaces as part of the EcoCAR Design Team.',
        imgSrc: './assets/uwaft.webp',
        tools: '#Python #ROS2 #Linux'
      },
      {
        title: 'Language Compiler',
        description: 'Developed a recognizer and parser that utilized recursive descent parsing and regular expressions ensuring compliance with semantic and syntactic rules through scanning, parsing, context-sensitive analysis, and code generation.',
        imgSrc: './assets/compiler.png',
        tools: '#Java'
      }
    ];
  }

  // Clear the container before adding new experiences
  experienceContainer.innerHTML = '';

  const expItem = document.createElement('div');
  expItem.className = 'experience-item active wrapper-grid';
  expItem.dataset.projectType = projectType;

  experiences.forEach(exp => {
    const expCard = document.createElement('div');
    expCard.className = 'container experience-card';
    expCard.innerHTML = `
      <div class="card">
        <div class="card-front">
          <img src="${exp.imgSrc}" alt="${exp.title}">
          <h2>${exp.title}</h2>
        </div>
        <div class="card-back" style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px;">
          <p style="font-size: 16px; text-align: center;">${exp.description}</p>
          <p class="tools-used">${exp.tools}</p>
          ${exp.githubLink ? `
          <a href="${exp.githubLink}" target="_blank" style="margin-top: 20px;">
            <img src="./assets/github-icon.svg" alt="GitHub" style="width: 48px; height: 48px;">
          </a>` : ''}
        </div>
      </div>
    `;
    expItem.appendChild(expCard);
  });

  experienceContainer.appendChild(expItem);
}


