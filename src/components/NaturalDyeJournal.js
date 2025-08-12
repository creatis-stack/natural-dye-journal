import React, { useState } from 'react';
import { Search, Plus, Clock, Droplets, AlertTriangle, Filter, Palette, ChevronDown, ChevronUp } from 'lucide-react';

const NaturalDyeJournal = () => {
  const [activeView, setActiveView] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [colorSearch, setColorSearch] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample recipes with Indian ingredients
  const sampleRecipes = [
    {
      id: 1,
      name: 'Turmeric Golden Yellow',
      category: 'roots',
      difficulty: 'Beginner',
      time: '2-3 hours',
      pH: '7-8',
      colorHex: '#F4A623',
      description: 'Bright golden yellow from fresh turmeric rhizomes',
      materials: [
        { item: 'Fresh turmeric rhizomes', amount: '200g' },
        { item: 'Cotton fabric', amount: '100g' },
        { item: 'Alum mordant', amount: '20g' },
        { item: 'Water', amount: '4L' }
      ],
      instructions: [
        'Grate fresh turmeric rhizomes and soak in 2L water overnight',
        'Strain liquid and heat to 80°C',
        'Add pre-mordanted wet fabric',
        'Maintain temperature for 45 minutes',
        'Remove fabric and rinse in cool water',
        'Air dry away from direct sunlight'
      ],
      safetyNotes: [
        'Turmeric stains easily - wear gloves',
        'Work in well-ventilated area',
        'Use stainless steel or enamel pots only'
      ],
      tips: [
        'Add a pinch of lime juice to brighten the yellow',
        'Iron modifier will shift color to olive green'
      ]
    },
    {
      id: 2,
      name: 'Madder Root Deep Red',
      category: 'roots',
      difficulty: 'Intermediate',
      time: '4-6 hours',
      pH: '6-7',
      colorHex: '#B22222',
      description: 'Rich crimson red from Indian madder (Rubia cordifolia)',
      materials: [
        { item: 'Dried Indian madder root', amount: '100g' },
        { item: 'Wool yarn', amount: '100g' },
        { item: 'Alum mordant', amount: '15g' },
        { item: 'Cream of tartar', amount: '8g' },
        { item: 'Water', amount: '5L' }
      ],
      instructions: [
        'Soak madder root in cold water for 24 hours',
        'Heat slowly to 60°C - never boil',
        'Maintain temperature for 1 hour',
        'Strain and cool dyebath to 40°C',
        'Add wet mordanted wool',
        'Heat slowly to 80°C over 30 minutes',
        'Hold temperature for 1 hour',
        'Cool gradually and rinse'
      ],
      safetyNotes: [
        'Never boil madder - destroys red pigment',
        'Wear mask when handling dry root powder',
        'Keep dyebath below 85°C'
      ],
      tips: [
        'Copper modifier produces purple-red',
        'Iron darkens to burgundy'
      ]
    },
    {
      id: 3,
      name: 'Indigo Blue Vat',
      category: 'leaves',
      difficulty: 'Advanced',
      time: '2 days',
      pH: '11-12',
      colorHex: '#1F2F96',
      description: 'Traditional blue from fresh indigo leaves (Indigofera)',
      materials: [
        { item: 'Fresh indigo leaves', amount: '2kg' },
        { item: 'Lime water', amount: '500ml' },
        { item: 'Jaggery', amount: '50g' },
        { item: 'Cotton cloth', amount: '200g' },
        { item: 'Water', amount: '10L' }
      ],
      instructions: [
        'Ferment fresh leaves in water for 12-16 hours',
        'Strain and beat liquid vigorously for 30 minutes',
        'Add lime water slowly while beating',
        'Allow indigo to settle for 4 hours',
        'Prepare alkaline vat with jaggery',
        'Add indigo paste to vat',
        'Dip fabric multiple times',
        'Oxidize between each dip'
      ],
      safetyNotes: [
        'Work outdoors - strong ammonia smell',
        'Wear protective clothing',
        'Keep vat covered when not in use'
      ],
      tips: [
        'Fresh leaves give best results',
        'Multiple light dips better than few heavy ones'
      ]
    },
    {
      id: 4,
      name: 'Pomegranate Rind Yellow',
      category: 'fruit',
      difficulty: 'Beginner',
      time: '3-4 hours',
      pH: '4-5',
      colorHex: '#DAA520',
      description: 'Warm yellow from dried pomegranate peels',
      materials: [
        { item: 'Dried pomegranate rinds', amount: '150g' },
        { item: 'Silk fabric', amount: '100g' },
        { item: 'Alum mordant', amount: '15g' },
        { item: 'Water', amount: '3L' }
      ],
      instructions: [
        'Boil pomegranate rinds in water for 1 hour',
        'Strain liquid and cool to 60°C',
        'Add pre-mordanted wet silk',
        'Heat gradually to 85°C',
        'Maintain for 45 minutes',
        'Remove and rinse thoroughly'
      ],
      safetyNotes: [
        'High tannin content - use non-iron vessels',
        'May cause skin irritation in sensitive individuals'
      ],
      tips: [
        'Iron modifier creates black',
        'Works excellently on protein fibers'
      ]
    },
    {
      id: 5,
      name: 'Indian Gum Arabic Brown',
      category: 'other',
      difficulty: 'Intermediate',
      time: '3-4 hours',
      pH: '5-6',
      colorHex: '#8B4513',
      description: 'Rich brown from babul ki chal (Acacia arabica bark)',
      materials: [
        { item: 'Dried babul bark', amount: '250g' },
        { item: 'Iron sulphate', amount: '10g' },
        { item: 'Cotton fabric', amount: '100g' },
        { item: 'Alum mordant', amount: '15g' },
        { item: 'Water', amount: '4L' }
      ],
      instructions: [
        'Soak dried bark in water overnight',
        'Boil bark for 2 hours to extract tannins',
        'Strain and cool liquid to 70°C',
        'Add pre-mordanted fabric',
        'Dye for 1 hour at constant temperature',
        'Add iron sulphate gradually for darker brown',
        'Rinse thoroughly in clean water'
      ],
      safetyNotes: [
        'Iron sulphate is corrosive - handle with care',
        'Wear gloves when handling iron mordant',
        'Use well-ventilated area'
      ],
      tips: [
        'Without iron, produces tan color',
        'Copper sulphate gives olive-brown'
      ]
    },
    {
      id: 6,
      name: 'Cutch Reddish Brown',
      category: 'bark',
      difficulty: 'Beginner',
      time: '2-3 hours',
      pH: '5-6',
      colorHex: '#A0522D',
      description: 'Deep reddish brown from katha (Acacia catechu extract)',
      materials: [
        { item: 'Cutch/Katha extract', amount: '50g' },
        { item: 'Cotton fabric', amount: '100g' },
        { item: 'Chrome mordant', amount: '12g' },
        { item: 'Hot water', amount: '3L' }
      ],
      instructions: [
        'Dissolve cutch extract in hot water',
        'Heat solution to 85°C',
        'Add pre-mordanted wet fabric',
        'Maintain temperature for 45 minutes',
        'Stir occasionally for even dyeing',
        'Remove and rinse in cool water',
        'Air dry in shade'
      ],
      safetyNotes: [
        'Chrome mordant is toxic - handle carefully',
        'Work in ventilated area',
        'Dispose of chrome solutions properly'
      ],
      tips: [
        'Iron deepens to dark chocolate brown',
        'Alum mordant gives lighter brown'
      ]
    },
    {
      id: 7,
      name: 'Marigold Orange Yellow',
      category: 'flowers',
      difficulty: 'Beginner',
      time: '1-2 hours',
      pH: '6-7',
      colorHex: '#FF8C00',
      description: 'Bright orange-yellow from genda flowers (Tagetes patula)',
      materials: [
        { item: 'Fresh marigold petals', amount: '500g' },
        { item: 'Wool yarn', amount: '100g' },
        { item: 'Alum mordant', amount: '20g' },
        { item: 'Cream of tartar', amount: '5g' },
        { item: 'Water', amount: '3L' }
      ],
      instructions: [
        'Extract petals from fresh marigold flowers',
        'Boil petals in water for 30 minutes',
        'Strain liquid and heat to 80°C',
        'Add pre-mordanted wet wool',
        'Maintain temperature for 30 minutes',
        'Remove and rinse gently',
        'Dry away from direct sunlight'
      ],
      safetyNotes: [
        'Some people may be allergic to marigold',
        'Test on small fabric piece first',
        'Use fresh flowers for best results'
      ],
      tips: [
        'Iron modifier shifts to olive gold',
        'Copper gives greenish-yellow'
      ]
    },
    {
      id: 8,
      name: 'Bastard Teak Burgundy',
      category: 'bark',
      difficulty: 'Intermediate',
      time: '5-6 hours',
      pH: '4-5',
      colorHex: '#800020',
      description: 'Deep burgundy from palash bark (Butea monosperma)',
      materials: [
        { item: 'Dried palash bark', amount: '200g' },
        { item: 'Silk fabric', amount: '100g' },
        { item: 'Alum mordant', amount: '18g' },
        { item: 'Iron sulphate', amount: '8g' },
        { item: 'Water', amount: '4L' }
      ],
      instructions: [
        'Soak bark in water for 24 hours',
        'Boil soaked bark for 3 hours',
        'Strain and concentrate liquid by half',
        'Cool to 70°C and add mordanted silk',
        'Dye for 1 hour stirring gently',
        'Add iron solution for burgundy depth',
        'Cool gradually and rinse'
      ],
      safetyNotes: [
        'Long boiling required - ensure good ventilation',
        'Iron can make fabric brittle - use sparingly',
        'Handle hot concentrated dye carefully'
      ],
      tips: [
        'Without iron gives reddish-orange',
        'Copper modifier produces wine red'
      ]
    },
    {
      id: 9,
      name: 'Brazilwood Red',
      category: 'bark',
      difficulty: 'Advanced',
      time: '6-8 hours',
      pH: '3-4',
      colorHex: '#DC143C',
      description: 'Brilliant red from sappanwood (Caesalpinia sappan)',
      materials: [
        { item: 'Dried sappanwood chips', amount: '150g' },
        { item: 'Wool yarn', amount: '100g' },
        { item: 'Alum mordant', amount: '20g' },
        { item: 'Cream of tartar', amount: '10g' },
        { item: 'White vinegar', amount: '100ml' },
        { item: 'Water', amount: '5L' }
      ],
      instructions: [
        'Soak wood chips in water with vinegar for 48 hours',
        'Heat slowly to extract red dye - do not boil',
        'Maintain at 80°C for 3 hours',
        'Strain liquid and cool to 60°C',
        'Add pre-mordanted wool carefully',
        'Heat gradually to 85°C over 45 minutes',
        'Hold temperature for 1 hour',
        'Cool slowly and rinse in acidic water'
      ],
      safetyNotes: [
        'Never boil - destroys red pigment',
        'Acidic solution can irritate skin',
        'Work in well-ventilated area'
      ],
      tips: [
        'Alkaline water shifts to purple-red',
        'Iron turns color to deep wine'
      ]
    },
    {
      id: 10,
      name: 'Henna Orange-Brown',
      category: 'leaves',
      difficulty: 'Beginner',
      time: '4-5 hours',
      pH: '5-6',
      colorHex: '#CD853F',
      description: 'Orange-brown from mehendi leaves (Lawsonia inermis)',
      materials: [
        { item: 'Dried henna leaves powder', amount: '100g' },
        { item: 'Cotton fabric', amount: '100g' },
        { item: 'Iron sulphate', amount: '15g' },
        { item: 'Hot water', amount: '3L' }
      ],
      instructions: [
        'Mix henna powder with hot water to make paste',
        'Let mixture stand for 2 hours to release dye',
        'Add more hot water to create dye bath',
        'Heat to 90°C and add wet fabric',
        'Maintain temperature for 1 hour',
        'Add iron sulphate for deeper color',
        'Continue dyeing for 30 minutes',
        'Rinse thoroughly and air dry'
      ],
      safetyNotes: [
        'Henna permanently stains skin and nails',
        'Wear protective gloves',
        'Iron solution can irritate skin'
      ],
      tips: [
        'Without iron gives orange color',
        'Copper produces olive-brown'
      ]
    },
    {
      id: 11,
      name: 'Ratanjot Purple',
      category: 'roots',
      difficulty: 'Advanced',
      time: '6-8 hours',
      pH: '8-9',
      colorHex: '#663399',
      description: 'Royal purple from ratanjot root (Alkanna tinctoria)',
      materials: [
        { item: 'Dried ratanjot root', amount: '80g' },
        { item: 'Silk fabric', amount: '100g' },
        { item: 'Alum mordant', amount: '20g' },
        { item: 'Washing soda', amount: '10g' },
        { item: 'Coconut oil', amount: '50ml' },
        { item: 'Water', amount: '4L' }
      ],
      instructions: [
        'Infuse crushed ratanjot in warm coconut oil overnight',
        'Strain oil and heat gently with alkaline water',
        'Create emulsion by stirring vigorously',
        'Add pre-mordanted silk to cool bath',
        'Heat very slowly to 70°C over 2 hours',
        'Maintain gentle heat for 2 more hours',
        'Cool gradually and rinse carefully',
        'Final rinse in slightly acidic water'
      ],
      safetyNotes: [
        'Oil-based dye requires careful handling',
        'Work in well-ventilated area',
        'Alkaline solutions can burn skin'
      ],
      tips: [
        'Acidic rinse brightens purple',
        'Iron shifts to deep violet'
      ]
    },
    {
      id: 12,
      name: 'Kitewood Yellow-Green',
      category: 'bark',
      difficulty: 'Intermediate',
      time: '4-5 hours',
      pH: '7-8',
      colorHex: '#9ACD32',
      description: 'Yellow-green from kite wood bark shavings',
      materials: [
        { item: 'Fresh kitewood bark', amount: '300g' },
        { item: 'Cotton fabric', amount: '100g' },
        { item: 'Copper sulphate', amount: '8g' },
        { item: 'Alum mordant', amount: '15g' },
        { item: 'Water', amount: '4L' }
      ],
      instructions: [
        'Scrape fresh bark and soak in water overnight',
        'Boil bark for 2 hours to extract yellow dye',
        'Strain liquid and heat to 85°C',
        'Add pre-mordanted cotton fabric',
        'Dye for 45 minutes with regular stirring',
        'Add copper sulphate solution gradually',
        'Continue dyeing for 30 minutes',
        'Remove and rinse thoroughly'
      ],
      safetyNotes: [
        'Copper sulphate is toxic - handle with care',
        'Wear gloves when adding copper solution',
        'Dispose of copper solutions responsibly'
      ],
      tips: [
        'Without copper gives bright yellow',
        'Iron modifier produces olive green'
      ]
    }
  ];

  const [recipes, setRecipes] = useState(sampleRecipes);
  
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    category: 'roots',
    difficulty: 'Beginner',
    time: '',
    pH: '',
    colorHex: '#F4A623',
    description: '',
    materials: [{ item: '', amount: '' }],
    instructions: [''],
    safetyNotes: [''],
    tips: ['']
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'roots', label: 'Roots & Rhizomes' },
    { id: 'leaves', label: 'Leaves & Stems' },
    { id: 'bark', label: 'Bark & Wood' },
    { id: 'fruit', label: 'Fruits & Berries' },
    { id: 'flowers', label: 'Flowers & Petals' },
    { id: 'other', label: 'Other Sources' }
  ];

  const colorPalette = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Green', hex: '#008000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Brown', hex: '#8B4513' },
    { name: 'Black', hex: '#000000' }
  ];

  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  const isColorSimilar = (color1, color2, threshold = 60) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const distance = Math.sqrt(
      Math.pow(r1 - r2, 2) + 
      Math.pow(g1 - g2, 2) + 
      Math.pow(b1 - b2, 2)
    );
    
    return distance <= threshold;
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || recipe.category === filterCategory;
    const matchesColor = !colorSearch || isColorSimilar(recipe.colorHex, colorSearch);
    
    return matchesSearch && matchesCategory && matchesColor;
  });

  const addMaterial = () => {
    setNewRecipe(prev => ({
      ...prev,
      materials: [...prev.materials, { item: '', amount: '' }]
    }));
  };

  const removeMaterial = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const addSafetyNote = () => {
    setNewRecipe(prev => ({
      ...prev,
      safetyNotes: [...prev.safetyNotes, '']
    }));
  };

  const addTip = () => {
    setNewRecipe(prev => ({
      ...prev,
      tips: [...prev.tips, '']
    }));
  };

  const handleSubmit = () => {
    const recipe = {
      ...newRecipe,
      id: recipes.length + 1,
      materials: newRecipe.materials.filter(m => m.item && m.amount),
      instructions: newRecipe.instructions.filter(i => i.trim()),
      safetyNotes: newRecipe.safetyNotes.filter(n => n.trim()),
      tips: newRecipe.tips.filter(t => t.trim())
    };
    setRecipes([...recipes, recipe]);
    setNewRecipe({
      name: '',
      category: 'roots',
      difficulty: 'Beginner',
      time: '',
      pH: '',
      colorHex: '#F4A623',
      description: '',
      materials: [{ item: '', amount: '' }],
      instructions: [''],
      safetyNotes: [''],
      tips: ['']
    });
    setShowAddForm(false);
  };

  const RecipeCard = ({ recipe }) => (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-amber-100"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="h-4" style={{ backgroundColor: recipe.colorHex }}></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-amber-900">{recipe.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>
        <p className="text-amber-700 text-sm mb-3">{recipe.description}</p>
        <div className="flex justify-between text-xs text-amber-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {recipe.time}
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            pH {recipe.pH}
          </div>
        </div>
      </div>
    </div>
  );

  const RecipeDetail = ({ recipe }) => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-8" style={{ backgroundColor: recipe.colorHex }}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-amber-900 mb-2">{recipe.name}</h1>
            <p className="text-amber-700">{recipe.description}</p>
          </div>
          <button
            onClick={() => setSelectedRecipe(null)}
            className="text-amber-600 hover:text-amber-800 font-medium"
          >
            ← Back to Recipes
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-amber-50 p-3 rounded-lg">
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${difficultyColors[recipe.difficulty]} mb-2`}>
              {recipe.difficulty}
            </span>
            <div className="text-sm text-amber-700">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                {recipe.time}
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                pH {recipe.pH}
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-2">Color Result</h3>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border-2 border-amber-200"
                style={{ backgroundColor: recipe.colorHex }}
              ></div>
              <span className="text-sm text-amber-700">{recipe.colorHex}</span>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-2">Category</h3>
            <span className="text-sm text-amber-700 capitalize">{recipe.category.replace(/([A-Z])/g, ' $1')}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-amber-900 mb-3">Materials</h2>
            <ul className="space-y-2">
              {recipe.materials.map((material, index) => (
                <li key={index} className="flex justify-between bg-amber-50 p-2 rounded">
                  <span className="text-amber-800">{material.item}</span>
                  <span className="text-amber-600 font-medium">{material.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-amber-900 mb-3">Instructions</h2>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-amber-800">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Safety Notes
            </h2>
            <ul className="space-y-1">
              {recipe.safetyNotes.map((note, index) => (
                <li key={index} className="text-red-700 text-sm">• {note}</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 mb-3">Tips & Variations</h2>
            <ul className="space-y-1">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="text-green-700 text-sm">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const AddRecipeForm = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900">Add New Recipe</h1>
        <button
          onClick={() => setShowAddForm(false)}
          className="text-amber-600 hover:text-amber-800 font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Recipe Name</label>
            <input
              type="text"
              required
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
              className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Category</label>
            <select
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
              className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {categories.slice(1).map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Difficulty</label>
            <select
              value={newRecipe.difficulty}
              onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
              className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Time Required</label>
            <input
              type="text"
              placeholder="e.g., 2-3 hours"
              value={newRecipe.time}
              onChange={(e) => setNewRecipe({...newRecipe, time: e.target.value})}
              className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">pH Level</label>
            <input
              type="text"
              placeholder="e.g., 7-8"
              value={newRecipe.pH}
              onChange={(e) => setNewRecipe({...newRecipe, pH: e.target.value})}
              className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Description</label>
            <textarea
              required
              rows="3"
              value={newRecipe.description}
              onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
              className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Color Result</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={newRecipe.colorHex}
                onChange={(e) => setNewRecipe({...newRecipe, colorHex: e.target.value})}
                className="w-12 h-10 border border-amber-200 rounded cursor-pointer"
              />
              <input
                type="text"
                value={newRecipe.colorHex}
                onChange={(e) => setNewRecipe({...newRecipe, colorHex: e.target.value})}
                className="flex-1 p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">Materials</label>
          {newRecipe.materials.map((material, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Material name"
                value={material.item}
                onChange={(e) => {
                  const materials = [...newRecipe.materials];
                  materials[index].item = e.target.value;
                  setNewRecipe({...newRecipe, materials});
                }}
                className="flex-1 p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Amount"
                value={material.amount}
                onChange={(e) => {
                  const materials = [...newRecipe.materials];
                  materials[index].amount = e.target.value;
                  setNewRecipe({...newRecipe, materials});
                }}
                className="w-32 p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              {newRecipe.materials.length > 1 && (
                <button
                  onClick={() => removeMaterial(index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addMaterial}
            className="text-amber-600 hover:text-amber-800 text-sm font-medium"
          >
            + Add Material
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">Instructions</label>
          {newRecipe.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <span className="bg-amber-200 text-amber-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                {index + 1}
              </span>
              <textarea
                rows="2"
                placeholder="Step description"
                value={instruction}
                onChange={(e) => {
                  const instructions = [...newRecipe.instructions];
                  instructions[index] = e.target.value;
                  setNewRecipe({...newRecipe, instructions});
                }}
                className="flex-1 p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          ))}
          <button
            onClick={addInstruction}
            className="text-amber-600 hover:text-amber-800 text-sm font-medium"
          >
            + Add Step
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Safety Notes</label>
            {newRecipe.safetyNotes.map((note, index) => (
              <textarea
                key={index}
                rows="2"
                placeholder="Safety note"
                value={note}
                onChange={(e) => {
                  const safetyNotes = [...newRecipe.safetyNotes];
                  safetyNotes[index] = e.target.value;
                  setNewRecipe({...newRecipe, safetyNotes});
                }}
                className="w-full p-2 mb-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            ))}
            <button
              onClick={addSafetyNote}
              className="text-amber-600 hover:text-amber-800 text-sm font-medium"
            >
              + Add Safety Note
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Tips & Variations</label>
            {newRecipe.tips.map((tip, index) => (
              <textarea
                key={index}
                rows="2"
                placeholder="Tip or variation"
                value={tip}
                onChange={(e) => {
                  const tips = [...newRecipe.tips];
                  tips[index] = e.target.value;
                  setNewRecipe({...newRecipe, tips});
                }}
                className="w-full p-2 mb-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            ))}
            <button
              onClick={addTip}
              className="text-amber-600 hover:text-amber-800 text-sm font-medium"
            >
              + Add Tip
            </button>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 font-medium"
          >
            Save Recipe
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="bg-gradient-to-r from-amber-800 to-orange-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <img src="logo_dyary.png" alt="DYARY" className="h-20" />
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Recipe
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showAddForm ? (
          <AddRecipeForm />
        ) : selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} />
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search recipes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="text-amber-600 w-5 h-5" />
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <Palette className="w-4 h-4 text-amber-600" />
                    Color Search
                    {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {showAdvancedFilters && (
                  <div className="border-t border-amber-100 pt-4">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-amber-900">Find recipes by color:</label>
                      <div className="flex flex-wrap gap-3 items-center">
                        {colorPalette.map(color => (
                          <button
                            key={color.name}
                            onClick={() => setColorSearch(colorSearch === color.hex ? '' : color.hex)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                              colorSearch === color.hex 
                                ? 'border-amber-500 bg-amber-50' 
                                : 'border-amber-200 hover:border-amber-300'
                            }`}
                          >
                            <div 
                              className="w-5 h-5 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.hex }}
                            ></div>
                            <span className="text-sm text-amber-800">{color.name}</span>
                          </button>
                        ))}
                        
                        <div className="flex items-center gap-2 px-3 py-2 border-2 border-amber-200 rounded-lg">
                          <input
                            type="color"
                            value={colorSearch || '#F4A623'}
                            onChange={(e) => setColorSearch(e.target.value)}
                            className="w-5 h-5 rounded border-0 cursor-pointer"
                          />
                          <span className="text-sm text-amber-800">Custom</span>
                        </div>
                        
                        {colorSearch && (
                          <button
                            onClick={() => setColorSearch('')}
                            className="px-3 py-2 text-sm text-amber-600 hover:text-amber-800 underline"
                          >
                            Clear color filter
                          </button>
                        )}
                      </div>
                      
                      {colorSearch && (
                        <div className="flex items-center gap-2 text-sm text-amber-700">
                          <span>Searching for colors similar to:</span>
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: colorSearch }}
                          ></div>
                          <span className="font-mono">{colorSearch}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-amber-600 text-lg">No recipes found matching your criteria.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-amber-700 hover:text-amber-900 font-medium"
                >
                  Add the first recipe →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default NaturalDyeJournal;
