// Thanks to https://github.com/jonathantneal/array-flat-polyfill/blob/master/src/index.js!
const _flatPolyfill = (arr, argument) => {
	let depth = isNaN(argument) ? 1 : Number(argument);
	const stack = Array.prototype.slice.call(arr);
	const result = [];

	while (depth && stack.length) {
		const next = stack.pop();
		if (Object(next) instanceof Array) {
			--depth;
			Array.prototype.push.apply(stack, next);
		} else {
			result.unshift(next);
		}
	}

	return result.concat(stack);
}

const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); };

const portfolioCards = {
	"zBot": {
		description: "zBot was a multi-purpose Discord bot application that allowed users to use commands to make their experience on their Discord server more enjoyable and interactive. It provided moderation commands to punish people for breaking rules, general purpose commands for advanced and detailed server management, as well as other fun commands to play around with.",
		moreinfo: true, // If true, get extra information from an external source (such as JSON file) and display it in a dialog or something (possibly another page if there's a lot of info)
		github: "zBlakee/zBot",
		website: "https://zbot.me",
		avatar: "https://cdn.discordapp.com/avatars/345766303052857344/b65473af3e075ba54d400e276e55dd0b.png?size=2048",
		role: "Lead Developer",
		languages: ["JavaScript", "Node.js", "HTML", "CSS"]
	},
	"Dank Memer": {
		description: "A Discord bot with over 340k servers, mainly in the business of providing it's users with funny memes and joke/entertainment commands to play around with.",
		moreinfo: false,
		github: "Dank-Memer",
		website: "http://dankmemer.lol",
		avatar: "https://dankmemer.lol/96fe07365c03726ce2b25e4988146aee.png",
		role: "Developer",
		languages: ["JavaScript", "Node.js", "Python"]
	},
	"Remindo": {
		description: "Remindo is a desktop application made in Electron with the goal of being a viable replacement for Google Keep by providing advanced reminder options such as timers, comments and markdown whilst maintaining a sleek and simplistic design.",
		moreinfo: false,
		github: "zBlakee/remindo",
		role: "Lead Developer",
		languages: ["JavaScript", "HTML", "CSS"]
	},
	"AstralMod": {
		description: "AstralMod is a Discord bot that I forked as the base for my own bot, zBot. During the development of zBot, I also made several contributions to AstralMod, from [entire new features](https://github.com/vicr123/AstralMod/compare/910d1c05658f...57085e6233d3) to [minor, smaller improvements](https://github.com/vicr123/AstralMod/pull/50).",
		moreinfo: false,
		github: "vicr123/AstralMod",
		avatar: "https://cdn.discordapp.com/avatars/282048599574052864/be9761dce1f4309003580915a78f55ac.png?size=2048",
		role: "Contributor",
		languages: ["JavaScript"]
	},
	"theShell": {
		description: "theShell is an open-source desktop environment developed using [Qt](https://www.qt.io/). The main goal is to be an \"all-in-one\" package for those who want the simplicity and functionality of a normal desktop environment, whilst also having the advanced features for developers.",
		moreinfo: false,
		github: "vicr123/theShell",
		website: "https://vicr123.com",
		avatar: "https://vicr123.com/images/theshell.png",
		role: "Contributor",
		languages: ["C++"]
	},
	"Securebot": {
		description: "A simple program that had multiple tools that allowed you to generate a password, check your password strength, check how secure your computer was, as well as giving you advice for how to combat viruses and general computer issues. Securebot also featured a password manager that had a master password lock.",
		moreinfo: false,
		github: "zBlakee/Securebot",
		role: "Lead Developer",
		languages: ["Visual Basic"]
	}
}

const languageColors = {
	"JavaScript": "#ff9800",
	"Node.js": "#66bb6a",
	"C++": "#ec407a",
	"HTML": "#ef5350",
	"CSS": "#673ab7",
	"Visual Basic": "#ba68c8",
	"Python": "#1976d2"
}

const addPortfolioCard = (title, info) => {
	let html = "";
	let languageBadges = "";
	if (info.languages) {
		for (const i in info.languages) {
			const language = info.languages[i]
			languageBadges += `<div class="badge" style="background-color: ${languageColors[language] || "grey"}">${language}</div>`
		}
	}
	html += `
		<div class="card z-depth-1 z-depth-1" style="background-color: #191919">
			<div class="card-content white-text">
				<span class="card-title">
				${info.avatar ? `<img class="avatar-small" src="${info.avatar}">` : ""} 
				<b>${title} <div class="badge">${info.role ? info.role : "Developer"}</div></b>
				</span>
				<p>${marked(info.description)}</p>
				<br>
				${languageBadges}
			</div>

			<div class="card-action">
				${info.moreinfo ? `<a href="#"><img src="assets/svg/information.svg" height=32 width=32></a>` : ""}
				${info.github ? `<a href="https://github.com/${info.github}"><img src="assets/svg/github.svg" height=32 width=32></a>` : ""}
				${info.website ? `<a href="${info.website}"><img src="assets/svg/network.svg" height=32 width=32></a>` : ""}
			</div>
		</div>
	`
	return html;
}

document.addEventListener("DOMContentLoaded", async function (event) {
	const mainTitle = document.getElementsByClassName('main-title')[0];
	
	for (const [key, value] of Object.entries(portfolioCards)) {
		document.getElementsByClassName('cards')[0].innerHTML += addPortfolioCard(key, value);
	}

	let greetings = ["G'day", "Hello", "Hi there", "Hey", "Hey there"];
	greetings = greetings.map(e => e += Math.floor(Math.random()*10)%2==0 ? ", " : "! ");
	const chosen = greetings[Math.floor(Math.random()*greetings.length)];
	const splitInnerHTML = mainTitle.innerHTML.split('')

	const greetingSplit = [ ..._flatPolyfill(chosen.trim().split(' ')), 'I\'m', 'Blake.' ].reverse();
	for (let word in greetingSplit) {
		splitInnerHTML.unshift(`<div class="word-main-title" style="visibility: collapse;">${greetingSplit[word]}</div>`)
		if (word) {
			splitInnerHTML.unshift(' ')
		}
	}

	const displayBio = () => {
		const bio = document.getElementsByClassName('lower-half')[0];
		setTimeout(() => {
			bio.style = '';
			bio.classList.add('animated', 'animatedFadeInUp', 'fadeInUp');
		}, 200);
	}

	mainTitle.innerHTML = splitInnerHTML.join('');
	// Represents the times between the next animation (100ms, then wait xms until next)
	const timings = [ 230, 100 ];

	let index = 0;
	let elementIndex = 0;
	const queue = [ ...mainTitle.children ];
	const callNextAnimation = () => {
		const elm = queue[elementIndex]
		if (!elm) {
			// We're done with the introduction now, display description
			displayBio();
			return;
		}
		const wordIsPartOfGreeting = chosen.includes(elm.innerHTML);
		const timing = timings[index];
		setTimeout(() => {
			elm.style = '';
			if (!wordIsPartOfGreeting) {
				index++;
			}
			if (elm.innerHTML.includes('Blake')) {
				let avatar = document.getElementsByClassName('avatar')[0];
				avatar.style = '';
				avatar.classList.add('animated', 'animatedFadeInUp', 'fadeInUp');
			}
			elm.classList.add('animated', 'animatedFadeInUp', 'fadeInUp');
			elementIndex++;
			callNextAnimation()
		}, wordIsPartOfGreeting ? 100 : timing);
	}
	callNextAnimation()
	// Finally, remove the style from main title
	console.log(mainTitle)
	mainTitle.style = '';
});
