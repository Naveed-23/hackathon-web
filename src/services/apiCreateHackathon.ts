import supabase, { supabaseUrl } from "./supabase";

// Function to create a new challenge, including image upload
export const createChallenge = async (challengeData: any, imageFile?: File) => {
  let imageUrl = '';

  // If an image file is provided, upload it to Supabase storage
  if (imageFile) {
    const fileName = `challenge-${Date.now()}`;
    const { error: storageError } = await supabase.storage.from('hackathon-images').upload(fileName, imageFile);
    if (storageError) throw new Error(storageError.message);

    imageUrl = `${supabaseUrl}/storage/v1/object/public/hackathon-images/${fileName}`;
  }

  // Insert the new challenge into the 'challenges' table
  const { data, error } = await supabase
    .from('hackathon')
    .insert({ ...challengeData, image: imageUrl });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
