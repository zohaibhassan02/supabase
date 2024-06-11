import supabase from '../helpers/supabaseClient.js';

const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const createUser = async (user) => {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const updateUserById = async (id, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const updateUserByEmail = async (email, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('email', email)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export {
  getUserByEmail,
  createUser,
  updateUserById,
  updateUserByEmail,
};
