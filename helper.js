

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
      return `${hours} hr`;
    } else if (days < 30) {
      return `${days} d `;
    } else if (months < 12) {
      return `${months} Mon`;
    } else {
      return `${years} Y`;
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