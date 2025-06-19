import React, { useEffect, useRef, useState } from 'react';
import {  Animated,  Image,  Platform, StatusBar, Switch, TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
// import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';






export default function ChallengeDescriptionModal
({isDescriptionrModalVisible, setIsDescriptionModalVisible , icon ,descriptionType
          }) {
            const { wid, height } = useWindowDimensions();
            const [isLoaded , setIsLoaded] = useState(false)
            const [text, setText] = useState(null)
            const slideAnim = useRef(new Animated.Value(height)).current;
            
            
            // useEffect(() => {
            //     let index = 0
            //     let textData =[]
            //     while(index * 35 <= text.length) {
            //         const s = text.slice(index * 35 , (index + 1) * 35 )
            //         textData.push(s)
            //         index = index + 1
            //     }
            //     setTextArray({textData:textData})
            //   }, []);
            
            useEffect(() => {
              Animated.timing(slideAnim, {
                toValue: 0,
                duration: 10,
                useNativeDriver: true,
              }).start();
              const showModal = async () => {
                // await NavigationBar.setVisibilityAsync("hidden");
                // await NavigationBar.setPositionAsync("absolute");
                // await NavigationBar.setBackgroundColorAsync("transparent");
                // await NavigationBar.setVisibilityAsync('sticky-immersive');
               
              };
              // showModal()
            }, [isDescriptionrModalVisible]);
            
            useEffect(() => {
              if(Platform.OS == "android"){
              NavigationBar.setPositionAsync("absolute");
              // NavigationBar.setBackgroundColorAsync("#00000000");
              NavigationBar.setVisibilityAsync('sticky-immersive');
              }
              setIsLoaded(true)
             }, []);
            
            const closeModal = async() => {
              Animated.timing(slideAnim, {
                toValue: height,
                duration: 10,
                useNativeDriver: true,
              }).start(() => setIsDescriptionModalVisible(false));
            
            };

            useEffect(() => {
              switch (descriptionType) {
                case "Adventure":
                    setText("Adventure 🧭 Step out of your comfort zone! These challenges push you to explore new places, try exciting activities, or face your fears.")
                    break;
                case "Eating":
                    setText("Eating 🍽️ Improve your relationship with food! Try new diets, cook different cuisines, or develop healthier eating habits.")
                    break;
                case "Fitness":
                    setText("Fitness 🏋️ Get moving and stay active! These challenges focus on physical activity, strength building, or endurance training.")
                    break;
                case "Music":
                    setText("Music 🎵 Dive into rhythm and melody! These challenges inspire you to explore music—whether it's learning an instrument, composing, singing, or just discovering new genres and artists.")
                    break;
                case "Dance" :
                    setText("Dance 💃🕺 Move to the beat! These challenges get you dancing—whether you're learning new choreography, exploring different styles, or just having fun and staying active through movement")
                    break;
                case "Sport" :
                    setText("Sport ⚽🏀 Compete, train, and stay sharp! These challenges focus on sports-related goals—whether you're practicing skills, joining a team activity, or improving performance in your favorite sport.")
                    break;
                case "Game" :
                    setText("Video Games 🎮 Level up your gaming! Take on challenges like beating a game, completing specific missions, improving your skills, or competing with friends in your favorite titles.")
                    break;
                case "Public" :
                    setText("Public 🌍 Open to everyone! Join community challenges where anyone can participate, like, and vote. Share your progress, compete with others, and see how you rank. It’s all about collective motivation and friendly competition!")
                    break;
                case "Open public" :
                    setText("Public 🌍 Open to everyone! Join community challenges where anyone can participate, like, and vote. Share your progress, compete with others, and see how you rank. It’s all about collective motivation and friendly competition!")
                    break;
                case "Private" :
                    setText("Private 🔒 Participation by invite only—likes and votes from the public! Only invited users can join and complete the challenge.")   
                    break;
                case "Open" :
                    setText("Private (Open) 🔒 Participation by invite only—likes and votes from the public! Only invited users can join and complete the challenge, but everyone can view, like, and vote on the progress. Great for close groups while still sharing the experience with the wider community.")   
                    break;
                case "Restricted":
                    setText("Private (Restricted) 🔒   Only your friends can view this challenge.Friends can like and vote, but cannot participate unless specifically invited. Only invited friends can submit entries or take part in the challenge")
                    break;
                case "Strict":
                    setText(" Private (Strict) 🔒   Only invited friends can view, like, vote, and participate in this challenge")
                    break;
                case "Challenge" :
                    setText(  
                 `Challenge the World, One Goal at a Time!
Welcome to Challengify — where challenges become a competition and everyone’s invited. Create your own challenges, invite friends or open them up to the public, and let the games begin!

🎯 Create Your Challenge
Set the rules, choose the theme (fitness, creativity, learning — you name it), and start the competition.

👥 Join and Compete
Discover exciting challenges from people around the world or join your friends' competitions. Show off your skills and push your limits.

👍 Like, Vote, Win
Participants can submit their entries, and the community gets to like and vote for their favorites. The most inspiring, creative, or impressive entries rise to the top!

🏆 Climb the Leaderboard
Gain likes, collect votes, and earn recognition as a top challenger.`)
                    break;
                case "Participation":
                    setText(`Participation Gallery
Explore the vibrant tapestry of entries submitted by participants in this challenge. Each post showcases individual creativity and effort, accompanied by real-time engagement metrics:

Likes: Express your appreciation by liking posts that resonate with you.

Votes: Cast your vote to support your favorite entries and influence the leaderboard.

Comments: Engage in meaningful conversations by leaving comments on posts.`)
                    break;
                case "Invite" :
                    setText(`Invites Gallery
See who’s been invited to join the challenge! This section gives a quick snapshot of all users who've received an invite — whether they’re already in, still deciding, or yet to respond.

👥 Who's Invited?
Browse the list of invitees with profile pictures, names, and current status:

✅ Joined – Actively participating

⏳ Pending – Invite sent, waiting for a response

❌ Declined – Invite not accepted`)
                    break;
                default:
                    break;
               }}, []);
            
            return (
               <>
                 {isLoaded && (
                  <View
                  style={styles.container}
                    className=" flex- justify-center items-center "  >
                    
                        <Modal 
                     
                          useNativeDriverForBackdrop={true}
                          transparent={true}
                          onBackdropPress={()=>{setIsDescriptionModalVisible(false)}}
                          visible={isDescriptionrModalVisible}  animationType="slide" onRequestClose={closeModal}>
                           
                          <View 
                            style={styles.modalOverlay} >
                            <Animated.View 
                              className=" borde-4 borde-black flex-col justify-between rounded-lg gap-4 items-center bg-[#dcd1ce]  "
                              style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }
                                     ,{bottom : descriptionType == "Challenge" ? "20%" :"30%" ,left: descriptionType == "Challenge" ?"5%":"15%"
                                     ,width: descriptionType == "Challenge" ?"90%":"70%" }]}>
                             
                              <View
                                className="py-4 w-[90%]  flex-col px-4 justify-start bg-[#fff] gap-2 rounded-lg g-[#636666] items-center">
                                     
                                            < Image   
                                                source={icon}
                                                className=" w-16 h-16 rounded-full"
                                                />
                                            <Text
                                            className="text-black font-bold"
                                             style={{fontSize:8}}
                                             >
                                              {descriptionType}
                                             </Text>
                              </View>
                              <View
                                className="py-6 w-[90%]  flex-col px-4 justify-start rounded-lg bg-[#ffffff] items-center">
                                     {/* {textArray && textArray.textData.map((text,index)=> {
                                        return  (
                                            <Text key={index} style={styles.modalText}
                                               className="font-bold" >{text}
                                            </Text>
                                        )
                                     })} */}
                                     <Text  style={styles.modalText}
                                               className="font-semibold" >
                                                {text && text}
                                    </Text>
                                      
                              </View>
                               
            
                              <View
                              className=" w-[90%]  flex-row justify-center gap- mt-5 items-center">
                
                                       <TouchableOpacity 
                                          onPress={ ()=> setIsDescriptionModalVisible(false) } 
                                          className="w-[80px] h-[35px] bg-black rounded-lg flex-row justify-center items-center">
                                            <Text
                                            className="text-white font-black"
                                             style={{fontSize:11}}
                                             >
                                               OK
                                             </Text>
                                       </TouchableOpacity>
                                      
                                        
                              </View>
                            
                            </Animated.View>
                          </View>
                        </Modal>
                        <StatusBar    backgroundColor={"transparent"}/>
                    </View>
            
                 )}
                    </>
            
            );
            };
            
            const styles = StyleSheet.create({
            container: {
              flex: 1,
              display:"flex",
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            },
            button: {
              backgroundColor: 'lightblue',
              padding: 10,
              borderRadius: 5,
            },
            buttonText: {
              fontSize: 16,
            },
            modalOverlay: {
              flex: 1,
            //   justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.0)',
            },
            modalContainer: {
              position: 'absolute',
              bottom: "30%",
              left: "15%",
            //   right: 0,
            //   backgroundColor: "white",
              padding: 25,
            //   borderTopLeftRadius: 10,
            //   borderRadius: 10,
            //   justifyContent:"center",
            //   alignItems: 'center',
              width:"70%",
            //   height:"50%"
            },
            modalText: {
              fontSize: 8,
            //   marginBottom: 20,
              color:"black"
            },
            closeButton: {
              backgroundColor: 'tomato',
              padding: 5,
              borderRadius: 5,
            },
            closeButtonText: {
              color: 'white',
              fontSize: 10,
            },
            });