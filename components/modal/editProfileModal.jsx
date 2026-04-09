import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { MotiView } from "moti";

const EditProfileModal = ({ visible, onClose, handleSave, user , userInfo , setUserInfo }) => {
//   const [name, setName] = useState(user?.name || "");
//   const [city, setCity] = useState(user?.city || "");
//   const [country, setCountry] = useState(user?.country || "");

//   const handleSave = () => {
//     onSave({ name, city, country });
//     onClose();
//   };

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* BACKDROP */}
      <View className="flex-1 bg-black/80 justify-center items-center px-4">

        {/* CARD */}
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-full max-w-[380px] bg-[#0f1113] rounded-xl p-5 border border-[#2d2d2d]"
        >

          <View className="gap-3">

            <View>
              <Text className="text-gray-400 text-xs mb-1">Name</Text>
              <TextInput
                value={userInfo.name}
                onChangeText={(e) => setUserInfo({...userInfo , name:e})}
                placeholder="Enter name"
                placeholderTextColor="#666"
                className="bg-[#16181a] text-white px-3 py-2 rounded-md border border-[#2a2a2a]"
              />
            </View>

            <View>
              <Text className="text-gray-400 text-xs mb-1">City</Text>
              <TextInput
                value={userInfo.city}
                onChangeText={(e) => setUserInfo({...userInfo , city:e})}
                placeholder="Enter city"
                placeholderTextColor="#666"
                className="bg-[#16181a] text-white px-3 py-2 rounded-md border border-[#2a2a2a]"
              />
            </View>
            <View>
              <Text className="text-gray-400 text-xs mb-1">State</Text>
              <TextInput
                value={userInfo.state}
                onChangeText={(e) => setUserInfo({...userInfo , state:e})}
                placeholder="Enter city"
                placeholderTextColor="#666"
                className="bg-[#16181a] text-white px-3 py-2 rounded-md border border-[#2a2a2a]"
              />
            </View>

            <View>
              <Text className="text-gray-400 text-xs mb-1">Country</Text>
              <TextInput
                value={userInfo.country}
                onChangeText={ (e) => setUserInfo({...userInfo , country:e})}
                placeholder="Enter country"
                placeholderTextColor="#666"
                className="bg-[#16181a] text-white px-3 py-2 rounded-md border border-[#2a2a2a]"
              />
            </View>

          </View>

          {/* ACTIONS */}
          <View className="flex-row justify-between items-center mt-6">

            {/* CANCEL */}
            <TouchableOpacity
             className="px-4 py-2 rounded-md border border-red-500"
             onPress={onClose}>
              <Text className="text-gray-500 text-sm">Cancel</Text>
            </TouchableOpacity>

            {/* SAVE */}
            <TouchableOpacity
              onPress={handleSave}
              onPressOut={onClose}
              className="px-4 py-2 rounded-md border border-yellow-500"
            >
              <Text className="text-yellow-500 text-sm font-medium">
                Save Changes
              </Text>
            </TouchableOpacity>

          </View>
        </MotiView>
      </View>
    </Modal>
  );
};

export default EditProfileModal;