import * as ImageManipulator from "expo-image-manipulator";

export const compressImage = async (uri) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 400 } }], // thumbnail size
    {
      compress: 0.6,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  return result.uri;
};