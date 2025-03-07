document.addEventListener("DOMContentLoaded", function () {
    const powerButton = document.getElementById("powerButton");
    const background = document.querySelector(".background");
    const monitor = document.querySelector(".monitor");
    const screen = document.querySelector(".screen");
    const video = document.getElementById("monitorVideo");
    const inputField = document.getElementById("commandInput");
    const output = document.getElementById("output");
    const redX = document.getElementById("redX");
    const startupSound = new Audio("startup.mp3");
    const backgroundMusic = new Audio("background.mp3");
    const errorSound = new Audio("buzzer.mp3");
    const correctSound = new Audio("correct.mp3");

    let systemOn = false; // Track whether the system is on


    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    startupSound.volume = 0.8;
    errorSound.volume = 0.7;
    correctSound.volume = 0.8;

    const commands = {
        "GLASSES": ">> DON’T CALL ME FOUR EYES",
        "BLOWHOLE": ">> DO NOT LET TSA SEE BLOWHOLE AFFILIATED MERCHANDISE OR TATTOOS.",
        "BLOW HOLE": ">> DO NOT LET TSA SEE BLOWHOLE AFFILIATED MERCHANDISE OR TATTOOS.",
        "WESLEY": "OPEN_IMAGE: wesleylore.jpg",
        "BIGPAPAWESWES": "OPEN_IMAGE: wesleylore.jpg",
        "MILO MERCER": "OPEN_IMAGE: wesleylore.jpg",
        "FOUR EYES": ">> 113.57.218.25",
        "113.57.218.25": ">> THAT’S YOUR IP ADDRESS. I’M NOT BLUFFING.",
        "KNOCK KNOCK": ">> WHO’S THERE?",
        "PLASMA GUN": ">> HONESTLY, I WAS SKEPTICAL ABOUT WHAT MADE THE EVAN-EST EVAN SO SPECIAL, AND THEN I SAW THE PLASMA GUN AND I UNDERSTOOD.",
        "HIDE AND SEEK": ">> I’LL HIDE, YOU COUNT.",
        "32847": "OPEN_DOCUMENT: detectivelore.jpg",
        "SEWERS": ">> SMELLY BUT EFFECTIVE.",
        "RIDDLE": ">> BREAD CRUMBS AND BEAVER SPIT",
        "GOVERNMENT": ">> THERE ARE EVANS INSIDE.",
        "CONSPIRACY": ">> YES, IT WAS AN INSIDE JOB.",
        "911": ">> YES, IT WAS AN INSIDE JOB.",
        "9/11": ">> YES, IT WAS AN INSIDE JOB.",
        "SECRET": ">> SECRET SECRETS ARE NO FUN, SECRET SECRETS HURT SOMEONE.",
        "INSIDE JOB": ">> BETTER TO BE AN \"INNIE\" THAN AN \"OUTIE\".",
        "RIDDLE SCHOOL": ">> BREAD CRUMBS AND BEAVER SPIT",
        "ESCAPE ACADEMY": ">> A RESPECTABLE INSTITUTION. ARE YOU A GRADUATE?",
        "GERALDEEN": ">> “AT NIGHT I DREAM OF GERALDEEN CONSISTENTLY”",
        "MONSTER CORP": ">> I WONDER WHAT ALL THESE SERVERS DO NOW THAT NOBODY IS HERE TO USE THEM ANYMORE?\n>> AT LEAST THIS ONE SAYS IT COMES WITH A '99.9% STABILITY GUARANTEE'!*\n>> THAT'S ALMOST 100%!",
        "MONSTER CORP.": ">> I WONDER WHAT ALL THESE SERVERS DO NOW THAT NOBODY IS HERE TO USE THEM ANYMORE?\n>> AT LEAST THIS ONE SAYS IT COMES WITH A '99.9% STABILITY GUARANTEE'!*\n>> THAT'S ALMOST 100%!",
        "SIGURD": ">> YOU’RE A LITTLE LOST, I THINK YOU'VE GOT THE WRONG GAME.",
        "MOONS": ">> YOU’RE A LITTLE LOST, I THINK YOU'VE GOT THE WRONG GAME.",
        "STORE": ">> YOU’RE A LITTLE LOST, I THINK YOU'VE GOT THE WRONG GAME.",
        "MIND PALACE": ">> WE ALL HAVE ONE. THANKS TO *HIM*.",
        "TURTLE EVAN": ">> SOME EVANS WERE LUCKIER THAN OTHER EVANS.",
        "MONSTER": ">> YOUR WEBCAM IS ON. THEY ARE WATCHING.",
        "CIA": ">> YOUR WEBCAM IS ON. WE ARE WATCHING.",
        "FBI": ">> YOUR WEBCAM IS ON. WE ARE WATCHING.",
        "NSA": ">> YOUR WEBCAM IS ON. WE ARE WATCHING.",
        "VPN": ">> YOU SHOULD GET ONE.\n>>113.57.218.25",
        "TURTLE": ">> SOME EVANS WERE LUCKIER THAN OTHER EVANS.",
        "HDMI CABLE": ">> GOOD TASTE. REDIRECT: https://soundcloud.com/rustygold-gaming/albums",
        "THE OLD MAN AND THE SEA": ">> MOST PEOPLE KNEW HIM AS THE CEO OF FISH PAY, BUT THAT CHANGED WHEN HE WAS CONTACTED BY SOMEONE WHO PROMISED TO ERASE THE PUBLIC'S MEMORY OF HIM IN EXCHANGE FOR HIS FORTUNE. HE HAD TO PAY FOR ALL OF THIS SOMEHOW.",
        "SUNDAY NIGHT HEAT": ">> IT’S A SHAME WHAT HAPPENED TO DETECTIVE EVAN.",
        "DETECTIVE EVAN": ">> [REDACTED]",
        "NOLAN CHANCE": ">> SMILE FOR THE CAMERAS! EVERYONE IS LOOKING SO FABULOUS TONIGHT! THAT’S PROBABLY WHAT HE WOULD SAY, IF HE WAS REAL. DOES DETECTIVE EVAN REALLY NOT KNOW? LET'S NOT TELL HIM.",
        "EVAN5": ">> WHOEVER THEY ARE, [REDACTED]",
        "AXOLOTL": ">> THERE’S AN AXOLOTL ON THE PINK STAIRS. IS AN AXOLOTL SUPPOSED TO BE THERE? IF YOU ASK AN AXOLOTL IF THEY’LL BE BACK TOMORROW, A PENGUIN WADDLES IN AND THEN THE AXOLOTL’S GONE.",
        "WHO ARE YOU": ">> I COULD ASK YOU THE SAME THING.",
        "WHO ARE YOU?": ">> I COULD ASK YOU THE SAME THING.",
        "EVANNEWS BLUE": ">> [REDACTED]",
        "EVAN NEWS BLUE": ">> [REDACTED]",
        "MICROWAVE": ">> CATALYST.",
        "HINT": ">> TRY ALT+F4.",
        "ANSWER": ">> QUESTION?",
        "QUESTION": ">> ANSWER.",
        "WHAT": ">> WHEN.",
        "WHEN": ">> WHERE.",
        "WHERE IS EVAN": ">> WHICH ONE?",
        "WHERE": ">> WHY.",
        "WHY": ">> THE MILLION DOLLAR QUESTION.",
        "WHO": ">> I COULD ASK YOU THE SAME QUESTION.",
        "HOW": ">> WHAT.",
        "APPENDIX": ">> 'But Haribo may have something sinister going on behind the scenes in Risk: Global Domination, as the players are reporting exploding appendixes. We have quotes from Carson Ronald Landry, an avid player and lover of all things Risk, who was required to have his appendix removed in order to continue playing Risk: GD. He goes on record to say, “I was just playing my favorite little videogame, Risk global domination, when I started getting really bad pains in my stomach in a bad way. I was eliminated from the game early and was left to suffer with the strange growing pains. Thankfully my best friend Evan clutched up the game, which may have saved me from dying that day”'",
        "SIGURD": ">> YOU’RE A LITTLE LOST, FRIEND.",
        "GUILTY OF SWEATIN": ">> IT WAS A SETUP.",
        "UNSOLVED": ">> OUGHT TO MIND THEIR OWN BUSINESS, IF YOU ASK ME.",
        "UNSOLVED NETWORK": ">> OUGHT TO MIND THEIR OWN BUSINESS, IF YOU ASK ME.",
        "INDIAN EVAN": ">> …POUR ONE OUT FOR HIM.",
        "EGG": ">> I WISH WE KNEW WHAT WOULD HAPPEN IF SOMEONE WERE TO PUT ONE INTO A MICROWAVE.",
        "WESLEY’S WORLD": ">> IT WAS ONLY A MATTER OF TIME BEFORE SOMETHING FILLED THE CAVITY THAT EVAN NEWS LEFT BEHIND.",
        "EVAN NEWS UNSOLVED": ">> ALMOST PROMPTED THE HIGHER-UPS TO TAKE ACTION. YOU SHOULD FEEL LUCKY THEY DIDN’T.",
        "EVANNEWS UNSOLVED": ">> ALMOST PROMPTED THE HIGHER-UPS TO TAKE ACTION. YOU SHOULD FEEL LUCKY THEY DIDN’T.",
        "EVAN NEWS": ">> AHEAD OF ITS TIME, IN MORE WAYS THAN ONE.",
        "EVAN NEWS 2": ">> CREATED TOO MUCH EXPOSURE [REDACTED]",
        "HUGO FIRST": ">> HUGO CONCLUDED THAT THEY WERE ON EARTH VERY QUICKLY. JUST SAYING.",
        "ONE WISH": ">> ONE OF THE MORE DANGEROUS EVANS. HE ACTUALLY *COULD* GET AWAY WITH ANY LIE. THE REASON WHY EVANS OF SIGNIFICANCE CARRY EAR PLUGS.",
        "DICK BALLSON": ">> DON’T EVER SAY THAT NAME AGAIN.",
        "SCIENCE EVAN": ">> *HIS* RIGHT-HAND MAN. HE DEVOTED HIS LIFE TO RESEARCH. MADE A NUMBER OF… ITEMS OF CONSEQUENCE.",
        "EVAN MARK-5": ">> ENTITY VIRTUAL APPLICATION NOESIS MK. 5 OF [REDACTED]",
        "DELETE": ">> PERMISSION DENIED.",
        "EVAN-EST EVAN": ">> YOU TELL ME. YOU KNOW HIM BETTER THAN I DO.",
        "FUCK EVAN": ">> 113.57.218.25",
        "EVAN SUCKS": ">> 113.57.218.25",
        "MR GLOBE": ">> HE WATCHES EVERYTHING. \n>> BUT WHO WATCHES HIM, I WONDER?",
        "M-BOMB": ">> DEPLOYMENT AUTHORIZATION DENIED.",
        "CI9": ">> 113.57.218.25",
	"CAMPAIGN WITH CARSON": ">> TWO LEADERS. TWO PATHS. BUT ONLY ONE MAKES IT TO THE END.",	"CI9": ">> DESIGNATION: CARSON INTELLIGENCE MODEL 9. PRIMARY FUNCTION: REPLACE THE ORIGINAL.",
	"CHEMICAL C": ">> WARNING: EXTENDED EXPOSURE MAY FRACTURE PERCEPTION OF SELF.",
	"BROKEN BOY": ">> LOGGED AS A FAILED VARIANT. RECOMMENDED ACTION: TERMINATION.",
	"COUSIN CUMSHOT": ">> THEY THOUGHT HE DIED. THEY WERE WRONG. \n>> BANNED IN SIX STATES.",
	"INFINITY MAN": ">> ANOMALY DETECTED. TIME DILATION EXCEEDS 100%. INTERVENTION PROTOCOL UNAVAILABLE.",
	"EVAN NEWS 3": ">> UPLOAD IN PROGRESS… ERROR: INDEFINITE PROCESSING LOOP DETECTED.",
	"X5": ">> GO NOBLES!",
	"XENON": ">> TODAY, IT IS USED IN LIGHTING APPLICATIONS, MEDICAL PROCEDURES, AND AS A PROPELLANT IN SPACE PROPULSION SYSTEMS. \n>> IN THE FUTURE, IT IS A FANTASTIC SOURCE OF ENERGY.",
        "PRIPYAT": ">> TOO MUCH RADIATION FOR EVEN MONSTER CORP TO STAY LONG. \n>> THEY LEFT IN ‘86. \n>> BUT SOMETHING STAYED.",
    };
    powerButton.addEventListener("click", function () {
        if (!systemOn) {
            // First click: Power on
            powerButton.classList.add("hidden");
            background.style.filter = "brightness(100%)";
            monitor.style.opacity = "1";
            systemOn = true;

            // Get video elements
            const video = document.getElementById("monitorVideo");
            const videoSource = document.getElementById("videoSource");

            // Start with Monster_Corp_2.webm (one-time intro animation)
            videoSource.src = "Monster_Corp_2.webm";
            video.load();
            video.play();

            // When the first animation ends, switch to Monster_Corp_1.webm (looping animation)
            video.onended = function () {
                video.style.opacity = "0"; // Start fade-out effect
                setTimeout(() => {
                    videoSource.src = "Monster_Corp_1.webm";
                    video.load();
                    video.play();
                    video.loop = true;
                    video.style.transition = "opacity 2s ease-in-out"; // Smooth fade-in
                    video.style.opacity = "1";
                }, 500); // Small delay for smoother transition
            };

            // Play startup sound, then loop background music
            startupSound.play();
            startupSound.onended = function () {
                backgroundMusic.play();
            };

            // Show input field after power-on
            inputField.style.opacity = "1";
            inputField.disabled = false;
            inputField.focus();
        }
    });

    // Allow Enter key to submit commands
    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            processCommand();
        }
    });

    // Ensure power button submits commands after startup
    powerButton.addEventListener("click", function () {
        if (systemOn && inputField.value.trim() !== "") {
            processCommand();
        }
    });

    // Process command function (Restores Red X and error sound)
    function processCommand() {
        let command = inputField.value.trim().toUpperCase();
        inputField.value = "";

        if (commands[command]) {
            let response = commands[command];

            correctSound.play();
            if (video) {
                video.style.display = "none";
                video.pause();
            }
            output.textContent = response;

            setTimeout(() => {
                if (video) {
                    video.style.display = "block";
                    video.play();
                }
                output.textContent = "";
            }, 5000);
        } else {
            // Error handling: Show Red X, play buzzer sound, then restore video
            errorSound.play();
            if (video) {
                video.style.display = "none";
                video.pause();
            }
            redX.style.display = "block";
            output.textContent = "";

            setTimeout(() => {
                redX.style.display = "none";
                if (video) {
                    video.style.display = "block";
                    video.play();
                }
            }, 1000);
        }
    }
});