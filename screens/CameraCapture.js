import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [camera, setCamera] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  });

  useEffect(async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    setCamera((prevState) => ({
      ...prevState,
      hasCameraPermission: status === 'granted',
    }));
  }, []);

  if (camera.hasCameraPermission === null) {
    return <View />;
  } else if (camera.hasCameraPermission === false) {
    return <Text>CAMERA permission denied</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={camera.type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setCamera({
                  type:
                    camera.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}>
              <Text style={{ fontSize: 18, marginBottom: 20, color: 'white' ,marginLeft:5}}>
                Flip{' '}
              </Text>
            </TouchableOpacity>
                  <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
            <View
              style={{
                alignSelf: 'flex-end',
                flex: 1,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                }}
              />
              </View>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}
