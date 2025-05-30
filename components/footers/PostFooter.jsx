import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// import { icons } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { icons } from '../../constants'

export default function PostFooter(props) {
  return (
    <View className="min-w-full flex-row items-center px-2 justify-between min-h-[7%]">
             
        <View className="flex-row w-[33%]  justify-start items-center gap-2">
                <Text className="text-blue-500 mt-4 text-sm font-bold">
                    Like 
                </Text>
                <TouchableOpacity onPress={props.handleLikes}
                  className="flex-col justify-center items-center w-12 h-12 ">
                    <Image 
                    className={props.isLiked ? "w-8 h-8" : "w-10 h-10"}
                    source={props.isLiked ? icons.like : icons.white_like}
                    resizeMode='contain'
                    />
                </TouchableOpacity>      
                <Text className="text-white mt-4 text-sm font-bold">
                    {props.likesVotesData.like_count}  
                </Text>
        </View>
        <View className="flex-row w-[34%]  justify-center items-center gap-2">
            <Text className="text-pink-400 mt-4 text-xs font-bold">
              {!props.isVoted ? 'Vote' :'Voted'}
            </Text>
            <TouchableOpacity onPress={props.handleVotes}
                className="flex-col justify-center items-center w-12 h-12  ">
                    {/* <Image 
                    className={props.isVoted ? "w-12 h-12" : "w-8 h-8"}
                    source= {props.isVoted ? icons.heart : icons.white_heart}
                    resizeMode='contain'
                    /> */}
                    <Ionicons name="heart" size={22} color={props.isVoted ? "red" : "white"}/>
                </TouchableOpacity>
                <Text className="text-white mt-4 text-sm font-bold">
                    {props.likesVotesData.vote_count || 0}
                </Text>
        </View>
        {/* <TouchableOpacity className="flex-row w-[25%]  justify-center items-center gap-2">
            <Image 
            className="w-7 h-7"
            source={icons.rank}
            resizeMode='contain'
            />
            <Text className=  "text-blue-200 mt-4 text-xl font-bold">
            {props.index+1 } <Text className=  "text-white mt-4 text-xs font-bold">
                 {props.index == 0 ? " Leading" : ""} </Text>
            </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
        onPress={() => props.setDisplayComments(prev => !prev)}
            className="flex-row w-[33%] gap-2 justify-center items-center">
             <Text className="text-white mt-4 text-xs font-bold">
                    comment
            </Text>
            <Ionicons name="chatbubble" size={25} color="white"/>
            <Text className="text-white mt-4 text-sm font-bold">
                    {props.comment_count}
            </Text>
        </TouchableOpacity>
    </View>
  )
}