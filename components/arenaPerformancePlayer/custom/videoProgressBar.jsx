
import React,{useEffect,useState,useRef}from"react";
import{View,Text,PanResponder}from"react-native";

export default function VideoProgressBar({player,visible=true}){

const[position,setPosition]=useState(0);
const[duration,setDuration]=useState(1);
const[isSliding,setIsSliding]=useState(false);
const [trackWidth,setTrackWidth]=useState(1);
const intervalRef=useRef(null);

useEffect(()=>{
if(!player)return;

intervalRef.current=setInterval(()=>{
if(isSliding)return;

try{
setPosition(player.currentTime||0);
setDuration(player.duration||1);
}catch(e){
setPosition(0);
setDuration(1);
}
},300);

return()=>{
if(intervalRef.current)clearInterval(intervalRef.current);
};
},[player,isSliding]);

const seek=(value)=>{
if(!player)return;

try{
if(typeof player.seekTo==="function"){
player.seekTo(value);
return;
}

player.currentTime=value;
}catch(e){}
};

const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
    setIsSliding(true);
    },
    onPanResponderMove: (e ) => {
        const x = e.nativeEvent.locationX;
    // clamp inside bar
    const clampedX = Math.max(0, Math.min(x, trackWidth));
    // convert to time
    const percent = clampedX / trackWidth;
    const newTime = percent * (duration || 1);
    // live preview (optional but feels smooth)
    setPosition(newTime);
    },
    onPanResponderRelease: (e ) => {
        const x = e.nativeEvent.locationX;
    const clampedX = Math.max(0, Math.min(x, trackWidth));
    const percent = clampedX / trackWidth;
    const finalTime = percent * (duration || 1);
    // 🎯 EXACT SEEK
    if (player?.seekTo) {
    player.seekTo(finalTime);
    } else {
    player.currentTime = finalTime;
    }
    setPosition(finalTime);
    setIsSliding(false);
    }
    });

if(!visible)return null;

const progress=(position/(duration||1))*100;

return(
<View style={{
position:"absolute",
left:14,
right:14,
bottom:10,
padding:12,
borderRadius:18,
zIndex : 999 ,
// backgroundColor:"rgba(0,0,0,0.45)"
}}>

<View style={{
flexDirection:"row",
justifyContent:"space-between",
// marginBottom:6
}}>
<Text style={{color:"#fff",fontSize:12 ,fontWeight :"600"}}>
{Math.floor(position/60)}:{String(Math.floor(position%60)).padStart(2,"0")}
</Text>

<Text style={{color:"#fff",fontSize:12 ,fontWeight :"600"}}>
{Math.floor(duration/60)}:{String(Math.floor(duration%60)).padStart(2,"0")}
</Text>
</View>

<View
{...panResponder.panHandlers}
onLayout={(e)=>{
    setTrackWidth(e.nativeEvent.layout.width);
    }}
style={{
height:20,
justifyContent:"center"
}}>

<View style={{
height:5,
backgroundColor:"rgba(255,255,255,0.15)",
borderRadius:4,
overflow:"hidden"
}}
className = "mt-auto" >
<View style={{
width:`${progress}%`,
height:"100%",
backgroundColor:"#eab308"
}}/>
</View>

</View>

</View>
);
}