import supabase from '../helpers/supabaseClient.js';

const addItem = async (req, res) => {
  try {
    const { name, description, type, quantity, price, user_id } = req.body;

    const { data, error } = await supabase
      .from('inventory')
      .insert([{ name, description, type, quantity, price, user_id }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, name, description, type, quantity, price } = req.body;

    const { data, error } = await supabase
      .from('inventory')
      .update({ name, description, type, quantity, price })
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;

    const { data, error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  addItem,
  getItems,
  updateItem,
  deleteItem
};
