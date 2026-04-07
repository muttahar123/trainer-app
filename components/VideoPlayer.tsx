import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const video = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      video.current?.pauseAsync();
    } else {
      video.current?.playAsync();
    }
  };

  return (
    <View className="w-full h-48 bg-black relative rounded-xl overflow-hidden justify-center items-center">
      <Video
        ref={video}
        style={StyleSheet.absoluteFill}
        source={{
          uri: videoUrl,
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
          }
        }}
      />
      
      {/* Play/Pause Overlay Component */}
      <TouchableOpacity 
        className="w-14 h-14 rounded-full bg-black/60 items-center justify-center shadow-lg"
        onPress={handlePlayPause}
        activeOpacity={0.8}
      >
        <FontAwesome 
          name={isPlaying ? "pause" : "play"} 
          size={20} 
          color="white" 
          style={{ marginLeft: isPlaying ? 0 : 4 }} 
        />
      </TouchableOpacity>
    </View>
  );
}
