import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { icons } from '../constants';
import { router } from 'expo-router';
import { uploadThumbnail } from '../firebase';
import { updateUser } from '../apiCalls';
import CountryFlag from 'react-native-country-flag';
// import CountryPicker from 'react-native-country-picker-modal';


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
  const insets = useSafeAreaInsets();


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
         .finally (
          setUser({...user , isNewUser:false}),
          setIsFetching(false),
          router.replace('/Home'),
          // setTimeout(() => {
          //   router.push('/ProfilePage')
          // }, 200)
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
            router.replace('/Home'),
            // setTimeout(() => {
            //   router.navigate('/ProfilePage')
            // }, 200)
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
        router.replace('/Home'),
        // setTimeout(() => {
        //   router.navigate('/ProfilePage')
        // }, 200)
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
    router.replace('/Home'),
    // setTimeout(() => {
    //   router.navigate('/ProfilePage')
    // }, 200)
    
    )  

}


const onSelectCountry = (country="US") => {
  setCountryCode(country.cca2);
  setCountryVisible(false);
};


  return (
    // <SafeAreaView
    // className="flex-1 bg-primary" >
        <View 
           style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top,
                    paddingBottom:insets.bottom,
           }}
           className="flex- 1 h-full w-full flex-col justify-start items-center bg-primary">
              
            

              <View
              className="w-[100%] h-[25%] bg-primary  justify-center items-center"
               >
                
                  <TouchableOpacity
                    onPress={()=>pickImage(setCover_img)}
                    // style={{left:width/2-24}}
                    className="w-[80%] h-[100%] flex-row justify-center items-center rounded-lg"
                    >
                        <Image  
                        className="w-[100%] h-[100%] rounded-lg"
                        source={{uri:cover_img}}
                        />
                        <Image
                        source={icons.update}
                        resizeMethod='contain'
                        className="w-10 h-10 absolute top-0 right-0 " />   
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{width:height/10 ,height:height/10
                        ,marginBottom: -height/20
                    }}
                    className="bg-  absolute bottom-0 bg-black flex-col rounded-full justify-center items-center ">
                    <Image 
                    className="w-[95%] h-[95%] rounded-full"
                    resizeMode='cover'
                    source={{uri:user && user.profile_img}} 
                    />
                       <TouchableOpacity
                      onPress={()=>pickImage(setProfile_img)}
                      className="w-[100px] h-[30px] absolute bottom-2 flex-row justify-center items-center rounded-lg"
                       >
                        <Image
                        source={icons.update}
                        className="w-8 h-8 "/>
                          
                      </TouchableOpacity>
                  </TouchableOpacity>
                  <View className="absolute top-0 left-0 flex-row justify-between items-center">
                   <TouchableOpacity
                        onPress={()=>router.back()}
                        className=" flex-row justify-center items-center  rounded-lg"
                        >
                            <Image
                            className="w-8 h-8"
                            source={icons.back} />
                    </TouchableOpacity>
                
                  </View>

              </View>


              <View
                    // style={{width:"100%",height:width/6-2}}
                    className="w-full h-[20%] flex-row justify-between px-2 items-center"
                    >
                      <View
                   
                        className="w-[30%] h-[50%] flex-col gap-4 justify-end items-center"
                        >
                        
                                 <Text 
                                   style={{fontSize:11}}
                                   className="text-gray-400 font-bold ">
                                   Enter City 
                                 </Text>
                                 <View className="w-[90%] p-1 borde-2 borde-white rounded-md bg-[#696666] -[50%] flex-row justify-center  items-center">
                                      <TextInput
                                          className="font-bold text-"
                                          style={{
                                            fontSize:13,
                                            color:"black",
                                            height: "95%", 
                                            width:"95%",
                                            textAlign:"center",
                                            borderColor: 'white',
                                            backgroundColor:"white",
                                            padding: 10,}}
                                            value={city}
                                            onChangeText={text => setCity(text)}
                                        />
                                 </View>
                               
                  
                           
                    </View>

                    <View
                        className="w-[30%] h-[50%] flex-col gap-1 justify-end items-center"
                        >
                                <CountryPicker
                                    visible={countryVisible}
                                    onSelect={onSelectCountry}
                                    onClose={() => setCountryVisible(false)}
                                  />
                                 <TouchableOpacity onPress={() => setCountryVisible(true)} 
                                      >
                                      <Text style={ {
                                            fontWeight:"800",
                                            color:"white",
                                            fontSize: 12,
                                          }}>{countryCode || 'Select Country'}</Text>
                                  </TouchableOpacity>
                                  
                                 <TouchableOpacity
                                    onPress={() => setCountryVisible(true)}
                                    className="w-[100%] h-[50%] mlauto flex-row justify-center items-end">
                                        < CountryFlag
                                            isoCode={countryCode}
                                            size={36}
                                        />
                                </TouchableOpacity>
                                 
                    </View>

                    <View
                        className="w-[30%] h-[50%] flex-col gap-4 justify-end items-center"
                        >
                                <Text 
                                   style={{fontSize:11}}
                                   className="text-gray-400 font-bold ">
                                    Enter State 
                                 </Text>
                                 <View className="w-[100%] p-1 borde-2 borde-white rounde-lg bg-[#564e4e] -[50%] flex-row justify-center  items-center">
                                      <TextInput
                                          className="font-bold rounded-md"
                                          style={{
                                            fontSize:13,
                                            color:"black",
                                            height: "95%", 
                                            width:"95%",
                                            textAlign:"center",
                                            borderColor: 'white',
                                            backgroundColor:"white",
                                            padding: 10,}}
                                            value={state}
                                            onChangeText={text => setState(text)}
                                        />
                                 </View>
                    </View>
                    
              </View>

              



         

              <View
              className="w-full h-[40%]  g-white flex-col justify-evenly gap- items-center "
               >
                    <View 
                    className= "w-[100%] h-[30%] flex-col justify-start items-center gap-4 " >
                        <Text 
                                className="text-gray-200"
                                style={ {
                                            fontWeight:"800",
                                            
                                            fontSize: 12,
                                          }}>Tell us about you</Text>
                        <TextInput
                          style={{fontSize:13}}
                          className= "w-[100%] h-[80%] px-2 border-2 border-gray bg-white text-blackece font-pregular rounded-lg"
                          placeholder="Tell us about yourself..."
                          onChangeText={newText => setTellUs(newText)}
                          defaultValue={tellUs}
                          multiline
                          numberOfLines={4} 
                          textAlignVertical="top"
                        />
                    </View>

                    <View 
                    className= "w-[100%] h-[30%] flex-col justify-start items-center gap-2 " >
                        <Text 
                           className="text-gray-200"
                           style={ {
                                            fontWeight:"800",
                                            fontSize: 12,
                                          }}>Tell us about your talent</Text>
                        <TextInput
                          style={{fontSize:11}}
                          className= "w-[100%] h-[80%] px-2 border-2 border-gray bg-white text-blackece font-pregular rounded-lg"
                          placeholder="Tell us about yourself..."
                          onChangeText={newText => setTellUs(newText)}
                          defaultValue={tellUs}
                          multiline
                          numberOfLines={4} 
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
    // </SafeAreaView>
  )
}