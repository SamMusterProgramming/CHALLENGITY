import { View, Text, TouchableOpacity } from 'react-native';

export default function CountryPickerWeb({ onSelect }) {
  return (
    <View style={{ padding: 8 }}>
      <TouchableOpacity
        onPress={() =>
          onSelect({
            cca2: 'US',
            name: { common: 'United States' },
          })
        }
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 6,
        }}
      >
        <Text>Select country</Text>
      </TouchableOpacity>
    </View>
  );
}
