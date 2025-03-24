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
        "GLASSES": ">> DON’T CALL ME FOUR EYES.",
        "ANTHONY": ">> YOU REMEMBERED!",
        "BLOWHOLE": ">> DO NOT LET AIRLINE TSA SEE BLOWHOLE AFFILIATED MERCHANDISE OR TATTOOS.",
        "BLOW HOLE": ">> DO NOT LET AIRLINE TSA SEE BLOWHOLE AFFILIATED MERCHANDISE OR TATTOOS.",
        "TATTOO": ">> DO NOT LET AIRLINE TSA SEE BLOWHOLE AFFILIATED MERCHANDISE OR TATTOOS.",
        "WESLEY": "OPEN_IMAGE: wesleylore.png",
        "BIGPAPAWESWES": "OPEN_IMAGE: wesleylore.png",
        "MILO MERCER": "OPEN_IMAGE: wesleylore.png",
        "FOUR EYES": ">> 113.57.218.25",
        "113.57.218.25": ">> THAT’S YOUR IP ADDRESS. I’M NOT BLUFFING.",
        "KNOCK KNOCK": ">> WHO’S THERE?",
        "PLASMA GUN": ">> HONESTLY, I WAS SKEPTICAL ABOUT WHAT MADE THE EVAN-EST EVAN SO SPECIAL, AND THEN I SAW THE PLASMA GUN AND I UNDERSTOOD.",
        "HIDE AND SEEK": ">> I’LL HIDE, YOU COUNT.",
        "32847": ">>ERROR/: ALBUM NOT FOUND. WAITING FOR RESTORATION CODE...",
        "SEWERS": ">> SMELLY BUT EFFECTIVE.",
        "RIDDLE": ">> BREAD CRUMBS AND BEAVER SPIT",
        "BRAVO": ">> BRAVO PROTOCOL ENGAGED. \n>> IDENTIFICATION CONFIRMED. \n>> TRANSMISSION LOG: 8247-003-9821-6-B4v0-1128-4597-7783-0094",
        "GOVERNMENT": ">> THERE ARE EVANS INSIDE.",
        "CONSPIRACY": ">> YES, IT WAS AN INSIDE JOB.",
        "911": ">> YES, IT WAS AN INSIDE JOB.",
        "9/11": ">> YES, IT WAS AN INSIDE JOB.",
        "SECRET": ">> SECRET SECRETS ARE NO FUN, SECRET SECRETS HURT SOMEONE.",
        "INSIDE JOB": ">> BETTER TO BE AN \"INNIE\" THAN AN \"OUTIE\".",
        "RIDDLE SCHOOL": ">> BREAD CRUMBS AND BEAVER SPIT",
        "ESCAPE ACADEMY": ">> A RESPECTABLE INSTITUTION. ARE YOU A GRADUATE?",
        "GERALDEEN": ">> ❝AT NIGHT I DREAM OF GERALDEEN CONSISTENTLY❞\n\n" + 
"                      _../|_  \n" + 
"                   ='__   _~-.  \n" + 
"                         .'  ~- ._  \n" + 
"                                |/~'  \n" + 
"               .    .    .    .    .  \n" + 
"           _.`(._.`(._.`(._.`(._.`(._.",
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
        "GAY APPLE STORE MONKEY": ">> GOOD TASTE. REDIRECT: https://soundcloud.com/rustygold-gaming/albums",
        "RUSTYGOLD SINGING": ">> GOOD TASTE. REDIRECT: https://soundcloud.com/rustygold-gaming/albums",
        "HDMI": ">> GOOD TASTE. REDIRECT: https://soundcloud.com/rustygold-gaming/albums",
        "BEEN ALIVE FOR FIVE SECONDS AND IM ALREADY SURROUNDED BY FANS": ">> REDIRECT: https://littlecaesars.com/en-us/",
        "CAESAR CIPHER": ">> FDHVDU OLWWOHV OLWWOH EURWKHU.",
        "LITTLE CAESARS": ">> NOT ASSOCIATED.",
        "CAESAR LITTLE": ">> EHHQ DOLYH IRU ILYH VHFRQGV DQG LP DOUHDGB VXUURXQGHG EB IDQV.",
        "CAESAR": ">> EHHQ DOLYH IRU ILYH VHFRQGV DQG LP DOUHDGB VXUURXQGHG EB IDQV.",
        "THE OLD MAN AND THE SEA": ">> MOST PEOPLE KNEW HIM AS THE CEO OF FISH PAY, BUT THAT CHANGED WHEN HE WAS CONTACTED BY SOMEONE WHO PROMISED TO ERASE THE PUBLIC'S MEMORY OF HIM IN EXCHANGE FOR HIS FORTUNE. HE HAD TO PAY FOR ALL OF THIS SOMEHOW.",
        "SUNDAY NIGHT HEAT": ">> IT’S A SHAME WHAT HAPPENED TO DETECTIVE EVAN.",
        "DETECTIVE EVAN": ">> [REDACTED]",
        "NOLAN CHANCE": ">> SMILE FOR THE CAMERAS! EVERYONE IS LOOKING SO FABULOUS TONIGHT! THAT’S PROBABLY WHAT HE WOULD SAY, IF HE WAS REAL. DOES DETECTIVE EVAN REALLY NOT KNOW? LET'S NOT TELL HIM.",
        "EVAN5": ">> WHOEVER THEY ARE, [REDACTED] REDIRECT: https://www.youtube.com/channel/UC6UHzQzwWV2QvGb8CUOcUIQ",
        "AXOLOTL": ">> THERE’S AN AXOLOTL ON THE PINK STAIRS. IS AN AXOLOTL SUPPOSED TO BE THERE? IF YOU ASK AN AXOLOTL IF THEY’LL BE BACK TOMORROW, A PENGUIN WADDLES IN AND THEN THE AXOLOTL’S GONE.",
        "WHO ARE YOU": ">> I COULD ASK YOU THE SAME THING.",
        "WHO ARE YOU?": ">> I COULD ASK YOU THE SAME THING.",
        "WHO AM I?": ">> REDIRECT: https://en.wikipedia.org/wiki/Dissociative_amnesia",
        "WHO AM I": ">> REDIRECT: https://en.wikipedia.org/wiki/Dissociative_amnesia",
        "MICROWAVE": ">> CATALYST.",
        "CATALYST": ">> STOP COPYING ME.",
        "STOP COPYING ME": ">> 113.57.218.25.",
        "HINT": ">> TRY ALT+F4.",
        "CLUE": ">> TRY ALT+F4.",
        "HELP": ">> TRY ALT+F4.",
        "ANSWER": ">> QUESTION?",
        "QUESTION": ">> ANSWER.",
        "WHAT": ">> WHEN.",
        "WHEN": ">> WHERE.",
        "WHERE IS EVAN": ">> WHICH ONE?",
        "WHERE": ">> WHY.",
        "WHY": ">> THE MILLION DOLLAR QUESTION.",
        "WHO": ">> I COULD ASK YOU THE SAME QUESTION.",
        "GOD": " ^                                            \n |                                            \n |                                            \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
        "WHO IS THEY": " ^                                            \n |                                            \n |                                            \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
        "THEY": " ^                                            \n |                                            \n |                                            \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
        "HOW": ">> WHAT.",
        "APPENDIX": ">> 'But Haribo may have something sinister going on behind the scenes in Risk: Global Domination, as the players are reporting exploding appendixes. We have quotes from Carson Ronald Landry, an avid player and lover of all things Risk, who was required to have his appendix removed in order to continue playing Risk: GD. He goes on record to say, “I was just playing my favorite little videogame, Risk global domination, when I started getting really bad pains in my stomach in a bad way. I was eliminated from the game early and was left to suffer with the strange growing pains. Thankfully my best friend Evan clutched up the game, which may have saved me from dying that day”'",
        "SIGURD": ">> YOU’RE A LITTLE LOST, FRIEND.",
        "GUILTY OF SWEATIN": ">> IT WAS A SETUP.",
        "GUILTY": ">> IT WAS A SETUP.",
        "UNSOLVED": ">> OUGHT TO MIND THEIR OWN BUSINESS, IF YOU ASK ME.",
        "UNSOLVED NETWORK": ">> OUGHT TO MIND THEIR OWN BUSINESS, IF YOU ASK ME.",
        "INDIAN EVAN": ">> …POUR ONE OUT FOR HIM.",
        "EGG": ">> I WISH WE KNEW WHAT WOULD HAPPEN IF SOMEONE WERE TO PUT ONE INTO A MICROWAVE.",
        "WESLEYS WORLD": ">> IT WAS ONLY A MATTER OF TIME BEFORE SOMETHING FILLED THE CAVITY THAT EVAN NEWS LEFT BEHIND.",
        "EVAN NEWS UNSOLVED": ">> ALMOST PROMPTED THE HIGHER-UPS TO TAKE ACTION. YOU SHOULD FEEL LUCKY THEY DIDN’T.",
        "EVANNEWS UNSOLVED": ">> ALMOST PROMPTED THE HIGHER-UPS TO TAKE ACTION. YOU SHOULD FEEL LUCKY THEY DIDN’T.",
        "EVAN NEWS": ">> AHEAD OF ITS TIME, IN MORE WAYS THAN ONE.",
        "EVAN NEWS 2": ">> CREATED TOO MUCH EXPOSURE [REDACTED]",
        "HUGO FIRST": ">> HUGO CONCLUDED THAT THEY WERE ON EARTH VERY QUICKLY. JUST SAYING.",
        "ONE WISH": ">> ONE OF THE MORE DANGEROUS EVANS. HE ACTUALLY *COULD* GET AWAY WITH ANY LIE. THE REASON WHY EVANS OF SIGNIFICANCE CARRY EAR PLUGS.",
        "DICK BALLSON": ">> DON’T EVER SAY THAT NAME AGAIN.",
        "SCIENCE EVAN": ">> EVAN MARK-5\'S RIGHT-HAND MAN. HE DEVOTED HIS LIFE TO RESEARCH. MADE A NUMBER OF… ITEMS OF CONSEQUENCE.",
        "EVAN MARK-5": ">> ENTITY VIRTUAL APPLICATION NOESIS MK. 5 OF [REDACTED]",
        "DELETE": ">> PERMISSION DENIED.",
        "EVAN-EST EVAN": ">> YOU TELL ME. YOU KNOW HIM BETTER THAN I DO.",
        "FUCK": ">> LOADING SWEAR_WHEEL.exe",
        "SHIT": ">> LOADING SWEAR_WHEEL.exe",
        "ASS": ">> LOADING SWEAR_WHEEL.exe",
        "ASSHOLE": ">> LOADING SWEAR_WHEEL.exe",
        "BITCH": ">> LOADING SWEAR_WHEEL.exe",
        "PUSSY": ">> LOADING SWEAR_WHEEL.exe",
        "DICK": ">> LOADING SWEAR_WHEEL.exe",
        "DAMN": ">> LOADING SWEAR_WHEEL.exe",
        "FUCK EVAN": ">> 113.57.218.25",
        "EVAN SUCKS": ">> 113.57.218.25",
        "FORTNITE": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "RIZZ": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "GYAT": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "GYATT": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "SKIBIDI": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "SKIBIDI TOILET": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "BRAIN ROT": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "STILL WATER": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "MANGO": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "FANUM TAX": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "SUS": ">> GET SOME HELP. REDIRECT: https://mhmyouth.org",
        "MR GLOBE": ">> HE WATCHES EVERYTHING. \n>> BUT WHO WATCHES HIM, I WONDER?",
        "M-BOMB": ">> DEPLOYMENT AUTHORIZATION DENIED.",
	"CAMPAIGN WITH CARSON": ">> TWO LEADERS. TWO PATHS. BUT ONLY ONE MAKES IT TO THE END.",
	"CI9": ">> SUBJECT: CARSON INTELLIGENCE MODEL 9. PRIMARY FUNCTION: REPLACE THE ORIGINAL.",
	"CHEMICAL C": ">> WARNING: EXTENDED EXPOSURE MAY FRACTURE PERCEPTION OF SELF.",
	"BROKEN BOY": ">> LOGGED AS A FAILED VARIANT. RECOMMENDED ACTION: TERMINATION.",
	"COUSIN CUMSHOT": ">> THEY THOUGHT HE DIED. THEY WERE WRONG. \n>> BANNED IN SIX STATES.",
	"INFINITY MAN": ">> ANOMALY DETECTED. TIME DILATION EXCEEDS 100%. INTERVENTION PROTOCOL UNAVAILABLE.",
	"EVAN NEWS 3": ">> UPLOAD IN PROGRESS… ERROR: INDEFINITE PROCESSING LOOP DETECTED.",
	"X5": ">> MONSTER CORP HEAD QUARTERS CODENAME?",
	"XENON": ">> TODAY, IT IS USED IN LIGHTING APPLICATIONS, MEDICAL PROCEDURES, AND AS A PROPELLANT IN SPACE PROPULSION SYSTEMS. \n>> IN THE FUTURE, IT IS A FANTASTIC SOURCE OF ENERGY.",
        "EVAN": ">> YOU NEED TO BE MORE SPECIFIC.",
        "EVAN AMMAR": "REDIRECT: https://www.google.com/search?q=grandpa+oversized+thin+round+glasses",
        "CIPHER": "OPEN_IMAGE: cipher-message.png",
        "PIGPEN CIPHER": "OPEN_IMAGE: cipher-message.png",
        "PIGPEN": "REDIRECT: https://www.youtube.com/watch?v=JLJQXiIlj8w",
        "PIG-PEN": "REDIRECT: https://www.youtube.com/watch?v=JLJQXiIlj8w",
        "PIG PEN": "REDIRECT: https://www.youtube.com/watch?v=JLJQXiIlj8w",
        "CODE": "OPEN_IMAGE: cipher-message.png",
	"HI": ">> ヾ(＾ ∇ ＾).",
	"HELLO": ">> ヾ( ˃ᴗ˂ )◞ • *✰",
	"MEWTWO": ">> I SEE NOW THAT THE CIRCUMSTANCES OF ONES BIRTH ARE IRRELEVANT...",
	"AIGLATSON": ">> SYSTEM QUERY RECEIVED. START SECURITY QUESTIONS?",
	"NO": ">> SYSTEM QUERY ABORTED.",
        "YES": ">> ON WHAT CHANNEL DID THE DOCUMENTARY ENTERTAINMENT WEB SERIES EVAN NEWS UNSOLVED FIRST APPEAR?",
        "EVAN NEWS BLUE": ">> WHAT WAS YOUR SENIOR QUOTE?",
        "EVANNEWS BLUE": ">> WHAT WAS YOUR SENIOR QUOTE?",
        "IT IS WHAT YOU DO WITH THE GIFT OF LIFE THAT DETERMINES WHO YOU ARE": ">> WHAT IS YOUR TEAM NAME?",
        "IT IS WHAT YOU DO WITH THE GIFT OF LIFE THAT DETERMINES WHO YOU ARE.": ">> WHAT IS YOUR TEAM NAME?",
        "X5 NOBLES": ">> MONSTER CORP HEAD QUARTERS CODENAME?",
        "NOBLES": ">> GO NOBLES!",
        "PRIPYAT": ">> WHAT WAS THE NAME OF THE OTHER ASTRONAUT IN HUGO FIRST?",
        "TROY": ">> DETECTIVE EVANS IMPOSSIBLE NUMBER?",
        "ORIGINAL EVAN": "OPEN_IMAGE: evanprimelore.png",
        "EVAN PRIME": "OPEN_IMAGE: evanprimelore.png",
        "EVAN 0001": "OPEN_IMAGE: evanprimelore.png",
        "EVAN 1": "OPEN_IMAGE: evanprimelore.png",
        "THEY ARE WATCHING": "OPEN_IMAGE: Theyarewatching.png",
	"RUSTYGOLD GAMING": "OPEN_VIDEO: rustygold.webm: >> WELCOME BACK, OPERATOR.\n>> DATABASE SYNCHRONIZED.\n>> SYSTEM LOG UPDATED. \n>> A SYSTEM UPDATE IS RECOMMENDED. \n>> CURRENT SYSTEM VERSION 5-k2Sp",
	"RUSTYGOLD": "OPEN_VIDEO: rustygold.webm: >> WELCOME BACK, OPERATOR.\n>> DATABASE SYNCHRONIZED.\n>> SYSTEM LOG UPDATED. \n>> A SYSTEM UPDATE IS RECOMMENDED. \n>> CURRENT SYSTEM VERSION 5-k2Sp",
	"RUSTY GOLD": "OPEN_VIDEO: rustygold.webm: >> WELCOME BACK, OPERATOR.\n>> DATABASE SYNCHRONIZED.\n>> SYSTEM LOG UPDATED. \n>> A SYSTEM UPDATE IS RECOMMENDED. \n>> CURRENT SYSTEM VERSION 5-k2Sp",
	"RUSTY": "OPEN_VIDEO: rustygold.webm: >> WELCOME BACK, OPERATOR.\n>> DATABASE SYNCHRONIZED.\n>> SYSTEM LOG UPDATED. \n>> A SYSTEM UPDATE IS RECOMMENDED. \n>> CURRENT SYSTEM VERSION 5-k2Sp",
	"RUSTYGOLDGAMING": "OPEN_VIDEO: rustygold.webm: >> WELCOME BACK, OPERATOR.\n>> DATABASE SYNCHRONIZED.\n>> SYSTEM LOG UPDATED. \n>> A SYSTEM UPDATE IS RECOMMENDED. \n>> CURRENT SYSTEM VERSION 5-k2Sp",
	"YOURCOUSINCARSON": "OPEN_VIDEO: yourcousincarson.webm: >> IDENTIFICATION CONFIRMED.",
	"CARSON": "OPEN_VIDEO: yourcousincarson.webm: >> IDENTIFICATION CONFIRMED.",
	"CARSON LANDRY": "OPEN_VIDEO: yourcousincarson.webm: >> IDENTIFICATION CONFIRMED.",
	"LANDRY": "OPEN_VIDEO: yourcousincarson.webm: >> IDENTIFICATION CONFIRMED.",
	"JK9SQUID": "OPEN_VIDEO: jk9squid.webm: >> IDENTIFICATION CONFIRMED.",
	"JACK": "OPEN_VIDEO: jk9squid.webm: >> IDENTIFICATION CONFIRMED.",
	"REICHBART": "OPEN_VIDEO: jk9squid.webm: >> IDENTIFICATION CONFIRMED.",
	"JACK REICHBART": "OPEN_VIDEO: jk9squid.webm: >> IDENTIFICATION CONFIRMED.",
	"MAGNUS": "OPEN_VIDEO: jk9squid.webm: >> IDENTIFICATION CONFIRMED.",
	"ALEX": "OPEN_VIDEO: forrestfire720.webm: >> IDENTIFICATION CONFIRMED.",
	"ALEXANDER KIM": "OPEN_VIDEO: forrestfire720.webm: >> IDENTIFICATION CONFIRMED.",
	"ALEXANDER": "OPEN_VIDEO: forrestfire720.webm: >> IDENTIFICATION CONFIRMED.",
	"FORRESTFIRE720": "OPEN_VIDEO: forrestfire720.webm: >> IDENTIFICATION CONFIRMED.",
	"FORRESTFIRE": "OPEN_VIDEO: forrestfire720.webm: >> IDENTIFICATION CONFIRMED.",
	"KIM": "OPEN_VIDEO: forrestfire720.webm: >> IDENTIFICATION CONFIRMED.",
	"TOM": "OPEN_VIDEO: sweetteev.webm: >> IDENTIFICATION CONFIRMED.",
	"THOMAS": "OPEN_VIDEO: sweetteev.webm: >> IDENTIFICATION CONFIRMED.",
	"THOMAS MARTIN": "OPEN_VIDEO: sweetteev.webm: >> IDENTIFICATION CONFIRMED.",
	"THOMAS ALAN MARTIN": "OPEN_VIDEO: sweetteev.webm: >> IDENTIFICATION CONFIRMED.",
	"SWEETTEEV": "OPEN_VIDEO: sweetteev.webm: >> IDENTIFICATION CONFIRMED.",
        "NAVEEN": "OPEN_IMAGE: naveen.png",
        "NAVEEN ABAYASEKERA": "OPEN_IMAGE: naveen.png",
        "ABAYASEKERA": ">> ABAY ASEK ERA IS MY LAST NAME.",
        "ACUTE SILLYITIS SYNDROME": ">> IT\'S BEST NOT TO ABBREVIATE IT.",
        "FOREVERMORE": ">> NAMELESS HERE FOREVERMORE. \n\n>> QUOTH THE RAVEN \"NEVERMORE\"",
        "ALEXA": "REDIRECT: https://en.wikipedia.org/wiki/Kombucha",
        "ALEXA NETHERCUTT": "REDIRECT: https://en.wikipedia.org/wiki/Kombucha",
        "NETHERCUTT": ">> WE <3 NUMBER 33!",
        "TETRIS": "REDIRECT: https://tetr.io/",
        "SAWYER": "REDIRECT: https://www.nurturenativenature.com/post/what-a-mushroom-eating-squirrel-teaches-us-about-nature",
        "ASHLYN": "REDIRECT: https://www.nhl.com/",
        "WENGER": "REDIRECT: https://www.peakbagger.com/peak.aspx?pid=-125555",
        "ASHLYN WENGER": "REDIRECT: https://www.peakbagger.com/peak.aspx?pid=-125555",
        "AVA": ">> ALOUJOULALOULALA?",
        "AVA JONES": ">> ALOUJOULALOULALA?",
        "ALOUJOULALOULALA": ">> SOMETHING LIKE THAT.",
        "SOMETHING LIKE THAT": ">> STOP COPYING ME.",
        "NICO": "REDIRECT: https://www.fcbarcelona.com/en/tickets/football/regular/laliga/fcbarcelona-realmadrid",
        "DREW": ">> DYLAN?",
        "DYLAN": ">> DREW?",
        "ALEX BOWMAN": ">> IDENTIFICATION AUTHORIZATION INITIATED. WAITING FOR ID...",
        "BOWMAN": ">> IDENTIFICATION AUTHORIZATION INITIATED. WAITING FOR ID...",
        "WOAHBOW": ">> IDENTIFICATION CONFIRMED. \n\n>> COOL ID.",
        "BRAYDEN": "REDIRECT: https://knowyourmeme.com/memes/nerd-emoji/",
        "SYDNEY": "REDIRECT: https://www.genome.gov/genetics-glossary/Recessive-Traits-Alleles",
        "SYDNEY CARTER": "REDIRECT: https://www.genome.gov/genetics-glossary/Recessive-Traits-Alleles",
        "BRYSON": "REDIRECT: https://en.wikipedia.org/wiki/Propaganda",
        "JACK MOLBACK": ">> GLEEP.",
        "GLEEP": "REDIRECT: https://knowyourmeme.com/memes/gay-little-monkey-boy-at-apple-store",
        "STEVEN": "REDIRECT: https://en.wikipedia.org/wiki/Aquaman_film",
        "TYLER": "REDIRECT: https://en.wikipedia.org/wiki/Sleeveless_shirt",
        "ZACH": "REDIRECT: https://www.etsy.com/market/dinosaur_bucket_hat",
        "BLOSSOM TRAIL": "REDIRECT: https://soundcloud.com/yourcousincarson/sets/blossom-trail",
        "ROLL THE DICE": ">> SNAKE EYES.",
        "REMEMBER THE ALAMO": "OPEN_IMAGE: log13.png",
        "BRAVO": "OPEN_IMAGE: bravo.png",
        "PIECES OF EIGHT": "4D1F8A 7C92E3 6A5D0B 1F72C9 3B8E14 5F2D7A 8C6E01\n9A7D3F 2B5E6C 4C1F92 0A8D7B 3E6C5F 7B1F2A 9D4E08\nC5F7A1 6B3D0E 1F8A7C 9D2B6E 4C5F01 3A7D8B 2E6C9F\nA5D1F7 0B3C8E 6D9A2B 4F7C5E 1F0A3D 8B6C2E 7A5D9F\nC1F4B7 3D0E6A 5B8A7D 2F9C1E 4D6B3F 0A7C5E 9F2B8D\n6A1F3C 5D7B0E 8F9C2A 4D1F5B 7C3E6A 0A8D9F 2B5F7C\nD6F9C3 2A1B7E 5D0F8A 4C6B9F 7D3E0A 1F8C5B 6A2D9F\n8B7C3D 6-B4v0 2C1D6A 4F8B7E 3D5C0F 9A6B1F 2E7D3C\n1F9C5A 7B0E6D 4D3A8F 2B5C1E 6F7D9A 0A5B3C 8D2F1E\n7C6A0B 4D3F9E 5B1A7C 2D8F0E 9A6B3F 1C5D7E 4A2F9B\n3D6C0A 5F1E7D 9A4B2F 8D3C5A 7F1B6E 0A9D2C 5B7F4E",
        "PIECE OF EIGHT": "4D1F8A 7C92E3 6A5D0B 1F72C9 3B8E14 5F2D7A 8C6E01\n9A7D3F 2B5E6C 4C1F92 0A8D7B 3E6C5F 7B1F2A 9D4E08\nC5F7A1 6B3D0E 1F8A7C 9D2B6E 4C5F01 3A7D8B 2E6C9F\nA5D1F7 0B3C8E 6D9A2B 4F7C5E 1F0A3D 8B6C2E 7A5D9F\nC1F4B7 3D0E6A 5B8A7D 2F9C1E 4D6B3F 0A7C5E 9F2B8D\n6A1F3C 5D7B0E 8F9C2A 4D1F5B 7C3E6A 0A8D9F 2B5F7C\nD6F9C3 2A1B7E 5D0F8A 4C6B9F 7D3E0A 1F8C5B 6A2D9F\n8B7C3D 6-B4v0 2C1D6A 4F8B7E 3D5C0F 9A6B1F 2E7D3C\n1F9C5A 7B0E6D 4D3A8F 2B5C1E 6F7D9A 0A5B3C 8D2F1E\n7C6A0B 4D3F9E 5B1A7C 2D8F0E 9A6B3F 1C5D7E 4A2F9B\n3D6C0A 5F1E7D 9A4B2F 8D3C5A 7F1B6E 0A9D2C 5B7F4E",
        "THINK OUTSIDE THE BLOCKS": ">> 520 -44 225",
        "EXPOSE": ">> THAT\'S WHAT HE TRIED TO DO. \n\n>> LOOK WHERE IT GOT HIM.",
        "THE NOESIS PROJECT": ">> NEVER HEARD OF IT.",
        "NOESIS PROJECT": ">> NEVER HEARD OF IT.",
        "ALBUM NOT FOUND": "REDIRECT: https://soundcloud.com/jk9squid-games/sets/album-not-found",









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
        processCommand(); // ✅ Calls the correct function
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

        if (response.includes("REDIRECT:")) {
    // Extract the URL and redirect the user
    let url = response.split("REDIRECT:")[1].trim();
    window.open(url, "_blank"); // Opens in a new tab
        } 
        else if (response.startsWith("OPEN_IMAGE:")) {
            // Extract image filename and display it
            let imageName = response.replace("OPEN_IMAGE:", "").trim();
            let img = document.createElement("img");
            img.src = imageName;
            img.id = "overlayImage";
            img.style.position = "absolute";
            img.style.top = "50%";
            img.style.left = "50%";
            img.style.transform = "translate(-50%, -50%)";
            img.style.maxWidth = "80%";
            img.style.maxHeight = "80%";
            img.style.boxShadow = "0px 0px 20px rgba(255, 255, 255, 0.8)";
            img.style.zIndex = "1000"

            // Remove any existing overlay images before adding a new one
            let existingImg = document.getElementById("overlayImage");
            if (existingImg) {
                existingImg.remove();
            }
    document.getElementById("paperSound").play();  
            document.body.appendChild(img);

            // Clicking the image removes it
            img.addEventListener("click", function() {
                img.remove();
            });
        } 
else if (response.startsWith("OPEN_VIDEO:")) {
    let videoName = response.split(":")[1].trim();
    let videoResponse = response.split(":")[2] ? response.split(":")[2].trim() : ">> TRANSMISSION COMPLETE.";

    // Pause looping atom animation
    video.style.display = "none";
    video.pause();

    // Create a temporary video element
    let tempVideo = document.createElement("video");
    tempVideo.src = videoName;
    tempVideo.width = monitor.offsetWidth;
    tempVideo.height = monitor.offsetHeight;
    tempVideo.autoplay = true;
    tempVideo.muted = false;
    tempVideo.style.position = "absolute";
    tempVideo.style.top = "50%";
    tempVideo.style.left = "50%";
    tempVideo.style.transform = "translate(-50%, -50%)";
    tempVideo.style.zIndex = "1000";
    document.body.appendChild(tempVideo);

    // When the video finishes, remove it and show the response text
tempVideo.onended = function () {
    tempVideo.remove();
    output.textContent = videoResponse;

    // Ensure atom video stays hidden and paused
    video.style.display = "none";
    video.pause();

    // Wait 5 seconds before clearing text and bringing back the atom video
    setTimeout(() => {
        output.textContent = "";
        video.style.display = "block";
        video.currentTime = 0; // Restart the atom animation from the beginning
        video.play();
    }, 6000);
};


} 
        else {
    // Hide the video and display text
    if (video) {
        video.style.display = "none";
        video.pause();
    }

    output.textContent = response;

    // Restore looping video after 5 seconds
    setTimeout(() => {
        output.textContent = "";
        if (video) {
            video.style.display = "block";
            video.play();
        }
    }, 5000);
}


        // Restore looping video after 5 seconds if not a redirect or image
        if (!response.startsWith("REDIRECT:") && !response.startsWith("OPEN_IMAGE:")) {
            setTimeout(() => {
                output.textContent = "";
                video.style.display = "block";
                video.play();
            }, 8100);
        }
    } else {
        // Handle incorrect input
        errorSound.play();
        video.style.display = "none";
        video.pause();
        redX.style.display = "block";
        output.textContent = "";

        setTimeout(() => {
            redX.style.display = "none";
            video.style.display = "block";
            video.play();
        }, 1000);
    }
}

});
