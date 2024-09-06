import supabase, { supabaseUrl } from "./supabase";

// Function to update the challenge, including image upload if changed
export const updateHackathon = async (challengeId: string, updatedData: any, imageFile?: File) => {
  let imageUrl = updatedData.image;

  // If a new image is provided, upload it to Supabase storage
  if (imageFile) {
    const fileName = `challenge-${challengeId}-${Date.now()}`;
    const { error: storageError } = await supabase.storage.from('hackathon-images').upload(fileName, imageFile);
    if (storageError) throw new Error(storageError.message);

    imageUrl = `${supabaseUrl}/storage/v1/object/public/hackathon-images/${fileName}`;
  }

  // Update the challenge in the database
  const { data, error } = await supabase
    .from('hackathon')
    .update({ ...updatedData, image: imageUrl }) // Update with the new image URL
    .eq('id', challengeId); 

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

