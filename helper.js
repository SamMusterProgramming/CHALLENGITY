

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