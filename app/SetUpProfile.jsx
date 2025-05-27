import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { icons } from '../constants';
import { router } from 'expo-router';
import { uploadThumbnail } from '../firebase';
import { updateUser } from '../apiCalls';
import CountryFlag from 'react-native-country-flag';
import CountryPicker from 'react-native-country-picker-modal';


export default function SetUpProfile() {

  const {user,setUser} = useGlobalContext();
  const { width, height } = Dimensions.get('window');
  const [profile_img, setProfile_img] = useState(user.profile_img);
  const [cover_img, setCover_img] = useState(user.cover_img);
  const [isFetching , setIsFetching] = useState(false)
  
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.state);
  const [state, setState] = useState(user.state);
  const [countryCode, setCountryCode] = useState(user.country || "US");
  const [countryVisible, setCountryVisible] = useState(false);
  const [tellUs, setTellUs] = useState(user.tellus || "");

  const pickImage = async (setProfile_img) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.canceled) {
        setProfile_img(result.assets[0].uri);
    }
};

const handleUpdate = ()=> {
   setIsFetching(true)
   if(profile_img !== user.profile_img && cover_img !== user.cover_img ) 
      Promise.all([uploadThumbnail(profile_img , user.email),uploadThumbnail(cover_img , user.email)])
      .then(urls => {
         const rawBody = {
              profile_img : urls[0],
              cover_img : urls[1],
              tellus:tellUs,
              state:state,
              city:city,
              country:countryCode
         }
        return updateUser(user._id,rawBody,setUser,user)
         .finally( 
          setUser({...user , isNewUser:false}),
          setIsFetching(false),
           router.navigate(`/profile`)
        )  
      })
   if(cover_img !== user.cover_img ) 
        uploadThumbnail(cover_img , user.email)
        .then(url => {
           const rawBody = {
                cover_img : url,
                tellus:tellUs,
                state:state,
                city:city,
                country:countryCode
           }
          return updateUser(user._id,rawBody,setUser,user)
           .finally( 
            setUser({...user , isNewUser:false}),
            setIsFetching(false),
            router.navigate(`/profile`)
          )  
   })
   if(profile_img !== user.profile_img ) 
    uploadThumbnail(profile_img , user.email)
    .then(url => {
       const rawBody = {
            profile_img : url,
            tellus:tellUs,
            state:state,
            city:city,
            country:countryCode
       }
      return updateUser(user._id,rawBody,setUser,user)
       .finally( 
        setUser({...user , isNewUser:false}),
        setIsFetching(false),
        router.navigate(`/profile`)
      )  
})

    const rawBody = {
      tellus:tellUs,
      state:state,
      city:city,
      country:countryCode
    }
    return updateUser(user._id,rawBody,setUser,user)
    .finally( 
    setUser({...user , isNewUser:false}),
    setIsFetching(false),
    router.navigate(`/profile`)
    )  

}


const onSelectCountry = (country="US") => {
  setCountryCode(country.cca2);
  setCountryVisible(false);
};


  return (
    <SafeAreaView
    className="flex-1 bg-primary" >
        <View 
          className="w-full h-full flex-col justify-start items-center bg-primary">
              
              <View className="w-full min-h-[7%] flex-row justify-between items-center">
                   <TouchableOpacity
                        onPress={()=>router.back()}
                        className=" flex-row justify-center items-center  rounded-lg"
                        >
                            <Image
                            className="w-10 h-10"
                            source={icons.back} />
                    </TouchableOpacity>
                    <Text 
                                   style={{fontSize:11}}
                                   className="text-white font-black ">
                                    Update Profile
                    </Text>
                    <TouchableOpacity
                        onPress={()=>router.navigate("NewChallenge")}
                        className=" flex-row justify-center items-center  rounded-lg"
                        >
                            <Image
                            className="w-10 h-10"
                            source={icons.challenge} />
                    </TouchableOpacity>

              </View>

              <View
              className="w-full h-[25%] bg-primary"
               >
               
                <Image  
                 className="w-[100%] h-[100%]"
                 source={{uri:cover_img}}
                 />

                  <TouchableOpacity
                    onPress={()=>pickImage(setCover_img)}
                    style={{left:width/2-24}}
                    className=" absolute top-14  flex-row justify-center items-center rounded-lg"
                    >
                    <Image
                    source={icons.update}
                    resizeMethod='contain'
                     className="w-12 h-12 " />
                        
                  </TouchableOpacity>

                  
                  <View
                    style={{width:"100%",height:width/6-2}}
                    className="w-full h-[25%] flex-row justify-center items-center"
                    >
                      <View
                        style={{width:"50%",height:width/6-2}}
                        className="w-[50%] h-[100%] flex-col justify-start items-center"
                        >
                            <View className="w-[100%] h-[40%] mt-4 flex-row justify-start px-2 items-center ">
                                 <Text 
                                   style={{fontSize:11}}
                                   className="text-gray-400 font-bold ">
                                    City :
                                 </Text>
                                 <TextInput
                                    className="font-black"
                                    style={{
                                      fontSize:10,
                                      color:"white",
                                      height: "99%", 
                                      width:"80%",
                                      borderColor: 'none',
                                      padding: 5,}}
                                      value={city}
                                      onChangeText={text => setCity(text)}
                                  />
                            </View>
                            <View className="w-[100%] h-[40%] flex-row justify-start px-2 items-center">
                                 <Text 
                                   style={{fontSize:11}}
                                   className="text-gray-400 font-bold ">
                                    State :
                                 </Text>
                                 <TextInput
                                    className="font-black"
                                    style={{
                                      fontSize:10,
                                      color:"white",
                                      height: "99%", 
                                      width:"80%",
                                      borderColor: 'none',
                                      padding: 5,}}
                                      value={state}
                                      onChangeText={text => setState(text)}
                                  />
                               
                            </View>

                    </View>


                    <View
                        style={{width:"50%",height:width/6-2}}
                        className="w-[50%] h-[100%] flex-col justify-start px-2 items-center "
                        >
                            <View 
                               className="w-[100%] h-[40%] mt-4 flex-row justify-endn px-2 items-center ">
                                 <Text 
                                   style={{fontSize:11}}
                                   className="text-gray-400 ml-auto font-bold ">
                                    City :
                                 </Text>
                                 <TextInput
                                    className="font-black"
                                    style={{
                                      fontSize:10,
                                      color:"white",
                                      height: "99%", 
                                      // width:"40%",
                                      borderColor: 'none',
                                      padding: 5,}}
                                      value={city}
                                      onChangeText={text => setCity(text)}
                                  />
                            </View>

                            <View className="w-[100%] min-h-[40%] flex-row justify-between px-2 items-center">
                                  <View
                                    className="w-[50%] h-[100%]  flex-row justify-center items-center">
                                        
                                  </View>
                                  <View
                                    className="w-[20%] h-[100%] ml-auto flex-row justify-center items-center">
                                        < CountryFlag
                                            isoCode={countryCode}
                                            size={12}
                                            style={ {
                                                marginLeft:"auto"
                                                }}
                                        />
                                  </View>
                                 
                                  <TouchableOpacity onPress={() => setCountryVisible(true)} style={{
                                        borderWidth: 0,
                                        padding: 10,
                                        borderRadius: 5,
                                        alignItems:"center",
                                        width:"30%"
                                      }}>
                                      <Text style={ {
                                            fontWeight:"800",
                                            color:"white",
                                            fontSize: 12,
                                          }}>{countryCode || 'Select Country'}</Text>
                                  </TouchableOpacity>
                                  <CountryPicker
                                    visible={countryVisible}
                                    onSelect={onSelectCountry}
                                    onClose={() => setCountryVisible(false)}
                                  />
                            </View>

                      </View>
                    
                  </View>

                  <View
                    style={{width:width/3,height:width/3, bottom:-width/6,left:(width- (width/3))/2}}
                    className=" bg-blue-400 absolute  rounded-full flex-row justify-center items-center"
                    >
                      <Image
                      className="w-[95%] h-[95%] rounded-full"
                      source={{uri:profile_img}}
                      />

                      <TouchableOpacity
                      onPress={()=>pickImage(setProfile_img)}
                      className="w-[100px] h-[30px] absolute bottom-2 flex-row justify-center items-center rounded-lg"
                       >
                        <Image
                        source={icons.update}
                        className="w-10 h-10 "/>
                          
                      </TouchableOpacity>
                  </View>


              </View>

              {/* <View
              style={{width:"100%",height:width/6}}
              className="w-full h-[25%]  bg-white"
               >
                
               </View> */}

              <View
              style={{marginTop:width/5+30}}
              className="w-full h-[40%]   flex-col justify-center gap-10 items-center "
               >
                    <View 
                    className= "w-[100%] h-[30%] flex-col justify-start items-center gap-2 " >
                        <Text style={ {
                                            fontWeight:"800",
                                            color:"gray",
                                            fontSize: 10,
                                          }}>Tell us about you</Text>
                        <TextInput
                          style={{fontSize:11}}
                          className= "w-[100%] h-[80%] px-2 border-2 border-gray bg-white text-blackece font-pregular rounded-lg"
                          placeholder="Tell us about yourself..."
                          onChangeText={newText => setTellUs(newText)}
                          defaultValue={tellUs}
                          multiline
                          numberOfLines={4} // Adjust as needed
                          textAlignVertical="top"
                        />
                    </View>

                    <View 
                    className= "w-[100%] h-[30%] flex-col justify-start items-center gap-2 " >
                        <Text style={ {
                                            fontWeight:"800",
                                            color:"gray",
                                            fontSize: 10,
                                          }}>Tell us about your talent</Text>
                        <TextInput
                          style={{fontSize:11}}
                          className= "w-[100%] h-[80%] px-2 border-2 border-gray bg-white text-blackece font-pregular rounded-lg"
                          placeholder="Tell us about yourself..."
                          onChangeText={newText => setTellUs(newText)}
                          defaultValue={tellUs}
                          multiline
                          numberOfLines={4} // Adjust as needed
                          textAlignVertical="top"
                        />
                    </View>
                
               </View>



              <View
              className="w-full h-[8%] mt-auto mb-1 flex-row  justify-center items-center "
               >
                 
                   <TouchableOpacity
                    onPress={handleUpdate}
                    className=" w-16 h-16 bg-white flex-row justify-center items-center  rounded-full"
                    >
                      {isFetching ? (
                            <View >
                              <ActivityIndicator size={40} color="black" />
                            </View>
                      ) : (
                          <Image
                           source={icons.update_profile}
                           className="w-14 h-14 "
                           resizeMethod='contain'
                          />
                      )}
                        
                  </TouchableOpacity>
               </View>

             

        </View>
    </SafeAreaView>
  )
}