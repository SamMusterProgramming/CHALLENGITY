import { icons } from "./constants";


export const findTopChallengers = (participants) => {
    let obj = {
        topChallenger : participants[0].name,
        votes : participants[0].votes
      }       
     participants.forEach(participant => {
        if(participant.votes > obj.votes) obj = {
            ...obj,
            topChallenger:participant.name,
            votes:participant.votes
          }
      });
      return obj
}

export const sortChallengeByVotes = (participants) =>{
     participants.sort((a,b)=>{
      const jA = a.votes;
      const jB = b.votes;
      return jB - jA;
     })
     return participants
}

export const getInition= (name) =>{
      const splitName = name.split(" ")
      let inition = ""
      splitName.forEach(word => {
          inition = inition + word.charAt(0).toUpperCase()
      })
  
  return inition
}

export function concatenateAndSortByDate(arr1, arr2, dateKey) {
    const combinedArray = arr1.concat(arr2);
  
    combinedArray.sort((a, b) => {
      return new Date(a[dateKey]) - new Date(b[dateKey]);
    });
  
    return combinedArray;
  }


  export function getTimeLapse(createdAt){
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = now.getTime() - createdDate.getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (seconds < 60) {
      return `${seconds} Sec `;
    } else if (minutes < 60) {
      return  `${minutes} Min`;
    } else if (hours < 24) {
      return `${hours} Hours`;
    } else if (days < 30) {
      return `${days} Day `;
    } else if (months < 12) {
      return `${months} Month`;
    } else {
      return `${years} Years`;
    }
  }

  export function formatTime(milliseconds) {
    let seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)));
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }


  export function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }

  export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  export function screenSize(widh ,height, setScreen) {
      widh < 330 ? setScreen(true) : setScreen(true)
  }


 export function getIcon(name){
    switch (name) {
       case "Music":
           return icons.music
           break;
       case "Magic":
           return icons.magic
           break;
       case "Asia":
           return icons.asia
           break;
       case "Africa":
           return icons.africa
           break;
        case "Europe":
             return icons.europe
             break;
        case "America":
            return icons.america
            break;
       case "Fitness":
            return icons.fitness
            break;
       case "Art":
            return icons.art
            break;
      case "Food":
            return icons.eating
            break;
      case "Dancing":
            return icons.dance
              break;
      case "Tech":
            return icons.tech
            break;
      case "Gaming":
            return icons.game
            break;
      case "Adventure":
            return icons.adventure
            break;
      case "Instrument":
              return icons.instrument
              break;
      case "Gaming":
              return icons.gamet
              break;
      case "Sport":
              return icons.sport
              break;
      case "Science":
              return icons.science
              break;
      case "Comedy":
              return icons.comedy
              break;
      case "Diet":
              return icons.diet
              break;

      case "home":
              return icons.home
              break;
      case "talent":
              return icons.talent
              break;
      case "challenge":
              return icons.challenge
              break;
      case "notification":
              return icons.notification
              break;
      case "profile":
              return icons.profile
              break;

      case "Public":
                return icons.publi
                break;
      case "Private":
                return icons.priv
       default:
           break;
    }
 }

 export const countryCodes = {
  'US': 'United States',
  'CA': 'Canada',
  'GB': 'United Kingdom',
  'DE': 'Germany',
  'FR': 'France',
  'JP': 'Japan',
  'AU': 'Australia',
  'IN': 'India',
  'CN': 'China',
  "DZ": 'Algeria'
};


export function selectIcon(name){
  switch (name) {
        case "home":
           return "home"
           break;
        case "talent":
           return "star"
           break;
        case "challenge":
           return "sword-cross"
           break;
        case "notification":
            return "bell-ring"
            break;
        case "profile":
            return "account"
            break;
        case "favourite":
            return "heart"
            break;
        case "stats":
            return "poll"
            break;
        case "trophy":
            return "trophy"
            break;
  }
}
export function selectIconColor(name){
  switch (name) {
      case "home":
           return "#3B82F6"
           break;
      case "talent":
           return "#edc153"
           break;
      case "challenge":
           return "#F97316"
           break;
      case "notification":
          return "#07a8e3"
          break;
       case "profile":
            return "#6366F1"
            break;
       case "favourite":
            return "#EC4899"
            break;
      case "stats":
            return "#10B981"
            break;
      case "trophy":
            return "#F59E0B"
            break;
  }
}