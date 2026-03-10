import CountryPicker from 'react-native-country-picker-modal';

export default function CountryPickerNative({
  visible,
  onSelect,
  onClose,
}) {
  return (
    <CountryPicker
      visible={visible}
      onSelect={onSelect}
      onClose={onClose}
      withFilter
      withFlag
      withCountryNameButton
    />
  );
}