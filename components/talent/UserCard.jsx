import { View, Text, Image } from "react-native";
import CountryFlag from "react-native-country-flag";

const UserCard = ({ selectedContestant , data ,height , width}) => {
  return (
    <View
      style={{
        height : height ,
        shadowColor:  "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6 ,
        shadowRadius: 6,
        elevation: 6,
      }}
      className="gap-4  flex- 1 flex-row justify-start items-end  "
    >
   
      <Image
        className = "rounded-full "
        source={{ uri: selectedContestant.profile_img }}
        style={{
          width: height * 0.9 ,
          height: height * 0.9 ,
 
          borderWidth:  1,
          borderColor:  "#374151",
        }}
      />

 
      <View 
      className ="justify-evenly flex-1 h-[100%]  pt-2 gap-1  items-start"
       style={{ 
  

       }}>
        <Text
                    className="absolute font-bebas tracking-widest top-0 left-[70%] p-1 border-b bor der-white"
                    style={{
                        color:  "#fff",
                        fontWeight: "700",
                        fontSize: width/30,
                    }}
                    >
                    {selectedContestant.rank <5 ? "TOP " + selectedContestant.rank : "Rank " + selectedContestant.rank}
        </Text>
    
        <Text
                    className="mt-auto"
                    style={{
                        color:  "#fff",
                        fontWeight: "700",
                        fontSize: width/30,
                    }}
                    >
                    {selectedContestant.name}
       </Text>


        <View
            className=" b g-black  gap-4 rounde d-tr-lg flex-row justify-center items-center">
                  
                    <Text
                    style={{
                        color:  "#d1d5db",
                        fontSize: width/33,
                    }}
                    >
                    {selectedContestant.city}
                    </Text>
                    <Text
                    style={{
                        color:  "#d1d5db",
                        fontSize: width/33,
                    }}
                    >
                    {selectedContestant.country}
                    </Text>
                    < CountryFlag
                        isoCode={selectedContestant.country || "US"}
                        size={width/28}/>
        </View>

       
     </View>


     {selectedContestant.rank === 1 && (
        <Text style={{ position: "absolute", top: 0 }}>
          👑
        </Text>
      )}
                                
    </View>
  );
};

export default UserCard;