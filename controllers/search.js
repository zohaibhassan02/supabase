const searchItems = async (req, res) => {
    try {
      const { query } = req.body;
      const userId = req.user.id;
  
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .textSearch('name', query, {
          config: 'english',
          type: 'websearch'
        })
        .eq('user_id', userId);
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  export default {
    searchItems
  };
  