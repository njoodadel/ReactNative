import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialCommunityIcons}
      iconSize={35}
      color={Platform.OS === 'android' ? 'white' : "white"}
    />
  );
};

export default CustomHeaderButton;
