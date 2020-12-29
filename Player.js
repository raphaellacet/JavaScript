import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Player(props) {

    const handleBack = async()=>{
        let newIndex = props.audioIndex - 1;
        if(newIndex < 0){
            newIndex = props.musics.length - 1;
        }
        props.setAudioIndex(newIndex); // render state before change it

        let curFile = props.musics[newIndex].file;

        // update app interface
        let newMusics = props.musics.filter((val,k)=>{
            if(newIndex == k){ // verify/validate song
              props.musics[k].playing = true;
              
              curFile = props.musics[k].file;
  
            }
            else{
              props.musics[k].playing = false;
            }
  
            return props.musics[k];
      })
        // play selected audio
        if(props.audio != null){
            props.audio.unloadAsync();
        }
        let curAudio = new Audio.Sound();
        try{
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        }catch(error){}

        props.setAudio(curAudio);
        props.setMusics(newMusics);
        props.setPlaying(true);

    }

    const handleNext = async()=>{
        let newIndex = props.audioIndex + 1;
        if(newIndex >= props.musics.length){
            newIndex = 0;
        }
        props.setAudioIndex(newIndex); // render state before change it

        let curFile = props.musics[newIndex].file;

        // update app interface
        let newMusics = props.musics.filter((val,k)=>{
            if(newIndex == k){ // verify/validate song
              props.musics[k].playing = true;
              
              curFile = props.musics[k].file;
  
            }
            else{
              props.musics[k].playing = false;
            }
  
            return props.musics[k];
      })
        // play selected audio
        if(props.audio != null){
            props.audio.unloadAsync();
        }
        let curAudio = new Audio.Sound();
        try{
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        }catch(error){}

        props.setAudio(curAudio);
        props.setMusics(newMusics);
        props.setPlaying(true); 

    }

    const handlePlay = async()=>{
        let curFile = props.musics[props.audioIndex].file; 

        let newMusics = props.musics.filter((val,k)=>{
            if(props.audioIndex == k){ // verify/validate song
              props.musics[k].playing = true;
              
              curFile = props.musics[k].file;
  
            }
            else{
              props.musics[k].playing = false;
            }
  
            return props.musics[k];
      })


      try{ // avoid app crash

        if(props.audio != null){
                props.setPlaying(true);
                props.setMusics(newMusics);
                await props.audio.playAsync();
        }else{
                let curAudio = new Audio.Sound();
                try{
                    await curAudio.loadAsync(curFile);
                    curAudio.playAsync();
                }catch(error){}

                props.setAudio(curAudio);
                props.setMusics(newMusics);
                props.setPlaying(true);
        }


      }catch(error){}


    }

    const handlePause = async()=>{
        if(props.audio != null){ // song already playing
            props.audio.pauseAsync();  
        } // pause
        props.setPlaying(false);
    }


    return(
        <View style={styles.player}>
            <TouchableOpacity onPress={()=>handleBack()} style={{marginRight:20, marginLeft:20}}>
                <AntDesign name="banckward" size={25} color="white" />
            </TouchableOpacity>

            { // if not playing a song, render for user to play
            (!props.playing)?
            <TouchableOpacity onPress={()=>handlePlay()} style={{marginRight:20, marginLeft:20}}>
                <AntDesign name="playcircleo" size={30} color="white" />
            </TouchableOpacity>
            : // else pause song
            <TouchableOpacity onPress={()=>handlePause()} style={{marginRight:20, marginLeft:20}}>
            <AntDesign name="pausecircleo" size={30} color="white" />
            </TouchableOpacity>
            }

            <TouchableOpacity onPress={()=>handleNext()} style={{marginRight:20, marginLeft:20}}>
                <AntDesign name="forward" size={25} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    player:{
        width:'100%',
        height:75,
        position:'absolute',
        bottom:0,
        left:0,
        zIndex:999,
        backgroundColor:'#111',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
})