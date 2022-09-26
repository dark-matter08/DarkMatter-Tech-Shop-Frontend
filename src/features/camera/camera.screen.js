import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import {
  Linking,
  TouchableOpacity,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../../../services/authentication/authentication.context';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import Loader from '../../../components/utilities/loader';
import {theme} from '../../../infrastructure/theme';
import {Icon} from '../../../components';
import {faCamera} from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  camera_button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: '50%',
    marginLeft: -50,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export const CameraScreen = ({navigation}) => {
  const [cameraMode, setCameraMode] = useState('front');
  const [cameraPermission, setCameraPermission] = useState();
  const cameraRef = useRef();
  const {user} = useContext(AuthenticationContext);

  const devices = useCameraDevices();
  const device = devices[cameraMode];

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermission(permission);
  }, []);

  const requestSavePermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    if (permission == null) {
      return false;
    }
    let hasPermission = await PermissionsAndroid.check(permission);
    if (!hasPermission) {
      const permissionRequestResult = await PermissionsAndroid.request(
        permission,
      );
      hasPermission = permissionRequestResult === 'granted';
    }
    return hasPermission;
  };

  const snapshot = async () => {
    const photo = await cameraRef.current.takeSnapshot({
      quality: 85,
      skipMetadata: true,
    });
    await AsyncStorage.setItem(`${user.uid}-photo`, photo.path);
    const hasPermission = await requestSavePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied!',
        'Vision Camera does not have permission to save the media to your camera roll.',
      );
      return;
    }
    await CameraRoll.save(`file://${photo.path}`, {
      type: photo.type,
    });
    navigation.goBack();
  };

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(status => {
      setCameraPermission(status);
    });
  }, []);

  if (cameraPermission !== 'authorized') {
    // request permisions
    requestCameraPermission();
  }

  if (device == null) return <Loader />;
  return (
    <View>
      <Camera
        style={styles.camera}
        ref={camera => (cameraRef.current = camera)}
        device={device}
        isActive={true}
        photo={true}
        video={true}
        preset="medium"
      />
      <TouchableOpacity onPress={snapshot} style={styles.camera_button}>
        <Icon icon={faCamera} size={30} />
      </TouchableOpacity>
    </View>
  );
};
