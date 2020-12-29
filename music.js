import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { LogBox } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImagePropTypes } from 'react-native';
import Player from "./Player.js";

export default function music() {
  
  LogBox.ignoreAllLogs(true);

  const [audioIndex, setAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false); // control playing songs
  
  const [audio,setAudio] = useState(null); // start app without palying a song

  const [musics,setMusics] = useState([ // songs available to play

    {
        name: 'Sweet child of mine',
        artist: 'Guns N Roses',
        playing: false,
        file: require('./sweet.mp3')
    },

    {
      name: 'Welcome to the Jungle',
      artist: 'Guns N Roses',
      playing: false,
      file: require('./jungle.mp3')
    },

    {
      name: 'Otherside',
      artist: 'Red Hot Chili Peppers',
      playing: false,
      file: require('./otherside.mp3')
    },

    {
      name: 'You Say Run',
      artist: 'Unknown',
      playing: false,
      file: require('./hero.mp3')
    },

    {
      name: 'Californication',
      artist: 'Red Hot Chili Peppers',
      playing: false,
      file: require('./california.mp3')
    },

    {
      name: 'Go Robot',
      artist: 'Red Hot Chili Peppers',
      playing: false,
      file: require('./robot.mp3')
    },

    {
      name: 'Dark Necessities',
      artist: 'Red Hot Chili Peppers',
      playing: false,
      file: require('./dark.mp3')
    },

    {
      name: 'We Are The Champions',
      artist: 'Queen',
      playing: false,
      file: require('./champion.mp3')
    },

    {
      name: 'Despacito',
      artist: 'Louis Fonsi',
      playing: false,
      file: require('./despacito.mp3')
    }
  ]);

  const changeMusic = async (id) =>{ // change songs
    let curFile = null; // song played after pressing button
    let newMusics = musics.filter((val,k)=>{
          if(id == k){
            musics[k].playing = true;
            
            curFile = musics[k].file;
            setPlaying(true); // control songs
            setAudioIndex(id);

          }
          else{
            musics[k].playing = false;
          }

          return musics[k];
    })
    
    if(audio != null){ // play only 1 song at a time
        audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try{
        await curAudio.loadAsync(curFile);
        await curAudio.playAsync();
    }catch(error){}

    setAudio(curAudio); // track state hook

    setMusics(newMusics) // state change hook
  }


  return (
    <View style={{flex:1}}>
    <ScrollView style = {styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Text style={{textAlign:'center',color:'white',fontSize:25}}>🎧Sound🌊Wave</Text>
      </View>

      <View style={styles.table}>
        <Text style={{width:'50%',color:'rgb(200,200,200)'}}>Music</Text>
        <Text style={{width:'50%',color:'rgb(200,200,200)'}}>Artist</Text>
      </View>


      { // array looping
        musics.map((val,k)=>{ // k identifies the array(song)

          if(val.playing){
            // render song here.
            return(
            <View style={styles.table}>
              <TouchableOpacity onPress={()=> changeMusic(k)} style={{width:'100%',flexDirection:'row'}}>
                <Text style={styles.tableTextSelected}><AntDesign name="play" size={15} 
                color='#1DB954'/>  {val.name}</Text>
                <Text style={styles.tableTextSelected}>{val.artist}</Text>
              </TouchableOpacity>
            </View>
            );
          }else{
            // render other song else
            return(
              <View style={styles.table}>
                <TouchableOpacity onPress={()=> changeMusic(k)} style={{width:'100%',flexDirection:'row'}}>
                  <Text style={styles.tableText}><AntDesign name="play" size={15} 
                  color="white"/>  {val.name}</Text>
                  <Text style={styles.tableText}>{val.artist}</Text>
                </TouchableOpacity>
              </View>
              ); 
          }

        })
      }

      <View style={{paddingBottom:200}}></View>
    </ScrollView>
    <Player playing={playing} setPlaying={setPlaying} audioIndex={audioIndex} musics={musics} 
      setMusics={setMusics} audio={audio} setAudio={setAudio} setAudioIndex={setAudioIndex}></Player>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header:{
    backgroundColor:'#1DB954',
    width:'100%',
    padding:20
  },
  table:{
    flexDirection:'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomWidth:1
  },
  tableTextSelected:{
    width:'50%',
    color:'#1DB954'
  },
  tableText:{
    width:'50%',
    color:'white'
  }
});
