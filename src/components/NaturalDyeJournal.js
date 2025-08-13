import React, { useState, useCallback } from 'react';
import { Search, Clock, Droplets, AlertTriangle, Filter, Edit3, Save, Download } from 'lucide-react';

// Separate Notes Component to prevent re-rendering issues
const NotesSection = ({ recipe, savedNotes, onSaveNotes, onDownloadPDF }) => {
  const [localNotes, setLocalNotes] = useState(savedNotes[recipe.id] || '');
  const [saveStatus, setSaveStatus] = useState(null);
  const [lastRecipeId, setLastRecipeId] = useState(recipe.id);

  // Only update local notes when switching to a different recipe
  React.useEffect(() => {
    if (recipe.id !== lastRecipeId) {
      setLocalNotes(savedNotes[recipe.id] || '');
      setLastRecipeId(recipe.id);
    }
  }, [recipe.id, savedNotes, lastRecipeId]);

  const handleNotesChange = (e) => {
    setLocalNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    onSaveNotes(recipe.id, localNotes);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 2000);
  };

  return (
    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <Edit3 className="w-5 h-5" />
          My Notes
        </h2>
        <button
          onClick={handleSaveNotes}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            saveStatus === 'saved'
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Save className="w-4 h-4" />
          {saveStatus === 'saved' ? 'Saved!' : 'Save Notes'}
        </button>
      </div>
      <textarea
        value={localNotes}
        onChange={handleNotesChange}
        placeholder="Add your personal notes, modifications, results, or observations about this recipe..."
        className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[100px]"
        rows="4"
      />
      <p className="text-blue-600 text-sm mt-2">
        Save your notes, then download the PDF to include them in the recipe.
      </p>
    </div>
  );
};

const NaturalDyeJournal = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [savedNotes, setSavedNotes] = useState({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Complete collection of 12 natural dye recipes
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
      colorHex: '#8B2635',
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
      category: 'bark',
      difficulty: 'Intermediate',
      time: '3-4 hours',
      pH: '5-6',
      colorHex: '#8B4513',
      description: 'Rich brown from babul ki chal (Acacia arabica bark)',
      materials: [
        { item: 'Dried acacia arabica bark', amount: '300g' },
        { item: 'Cotton fabric', amount: '150g' },
        { item: 'Iron sulfate', amount: '10g' },
        { item: 'Alum mordant', amount: '25g' },
        { item: 'Water', amount: '6L' }
      ],
      instructions: [
        'Soak bark pieces in water for 4 hours',
        'Boil bark solution for 2 hours',
        'Strain and cool liquid to 70°C',
        'Add pre-mordanted fabric',
        'Simmer for 1 hour',
        'Add iron sulfate for darker brown',
        'Rinse thoroughly when cool'
      ],
      safetyNotes: [
        'Iron sulfate is toxic - handle with care',
        'Wear gloves when handling bark',
        'Work in ventilated area'
      ],
      tips: [
        'Longer boiling extracts more tannins',
        'Add iron gradually to control color depth'
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
        { item: 'Cotton yarn', amount: '100g' },
        { item: 'Alum mordant', amount: '15g' },
        { item: 'Water', amount: '3L' }
      ],
      instructions: [
        'Dissolve cutch extract in warm water',
        'Heat solution to 80°C',
        'Add pre-mordanted wet yarn',
        'Maintain temperature for 45 minutes',
        'Stir gently every 10 minutes',
        'Remove and rinse in cool water',
        'Air dry in shade'
      ],
      safetyNotes: [
        'Cutch can cause skin staining',
        'Use non-reactive vessels only'
      ],
      tips: [
        'Iron modifier deepens to dark brown',
        'Copper gives greenish cast'
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
        { item: 'Silk scarf', amount: '50g' },
        { item: 'Alum mordant', amount: '10g' },
        { item: 'Cream of tartar', amount: '5g' },
        { item: 'Water', amount: '2L' }
      ],
      instructions: [
        'Crush fresh marigold petals',
        'Steep in hot water (80°C) for 30 minutes',
        'Strain and reheat liquid to 70°C',
        'Add pre-mordanted silk',
        'Maintain heat for 30 minutes',
        'Remove and rinse gently'
      ],
      safetyNotes: [
        'Fresh flowers may cause allergic reactions',
        'Test on skin before handling large quantities'
      ],
      tips: [
        'Use freshly picked flowers for best color',
        'Iron modifier shifts to golden brown'
      ]
    },
    {
      id: 8,
      name: 'Bastard Teak Burgundy',
      category: 'bark',
      difficulty: 'Intermediate',
      time: '5-6 hours',
      pH: '4-5',
      colorHex: '#722F37',
      description: 'Deep burgundy from palash bark (Butea monosperma)',
      materials: [
        { item: 'Dried palash bark', amount: '400g' },
        { item: 'Wool fabric', amount: '200g' },
        { item: 'Alum mordant', amount: '30g' },
        { item: 'Copper sulfate', amount: '5g' },
        { item: 'Water', amount: '8L' }
      ],
      instructions: [
        'Soak bark overnight in water',
        'Boil bark for 3 hours',
        'Strain liquid and cool to 60°C',
        'Add pre-mordanted wool',
        'Heat slowly to 85°C over 1 hour',
        'Add copper sulfate for burgundy shade',
        'Cool slowly and rinse thoroughly'
      ],
      safetyNotes: [
        'Copper sulfate is toxic - use minimal amounts',
        'Wear protective equipment',
        'Dispose of bath water responsibly'
      ],
      tips: [
        'Longer extraction gives deeper colors',
        'Iron modifier creates nearly black'
      ]
    },
    {
      id: 9,
      name: 'Brazilwood Red',
      category: 'bark',
      difficulty: 'Advanced',
      time: '6-8 hours',
      pH: '3-4',
      colorHex: '#C21807',
      description: 'Brilliant red from sappanwood (Caesalpinia sappan)',
      materials: [
        { item: 'Sappanwood chips', amount: '200g' },
        { item: 'Silk yarn', amount: '100g' },
        { item: 'Alum mordant', amount: '20g' },
        { item: 'Cream of tartar', amount: '10g' },
        { item: 'Citric acid', amount: '5g' },
        { item: 'Water', amount: '5L' }
      ],
      instructions: [
        'Soak sappanwood chips for 24 hours',
        'Heat slowly to 80°C - do not boil',
        'Maintain temperature for 2 hours',
        'Strain and add citric acid',
        'Cool to 60°C and add silk',
        'Heat gradually to 75°C',
        'Hold for 1 hour, cool slowly',
        'Rinse in acidulated water'
      ],
      safetyNotes: [
        'Never boil sappanwood - destroys red compounds',
        'Handle citric acid with care',
        'Work in well-ventilated area'
      ],
      tips: [
        'pH control is critical for color development',
        'Alkaline conditions shift to purple'
      ]
    },
    {
      id: 10,
      name: 'Henna Orange-Brown',
      category: 'leaves',
      difficulty: 'Beginner',
      time: '2-3 hours',
      pH: '5-6',
      colorHex: '#CD853F',
      description: 'Warm orange-brown from henna leaves (Lawsonia inermis)',
      materials: [
        { item: 'Dried henna powder', amount: '100g' },
        { item: 'Cotton fabric', amount: '150g' },
        { item: 'Alum mordant', amount: '20g' },
        { item: 'Iron sulfate', amount: '8g' },
        { item: 'Water', amount: '4L' }
      ],
      instructions: [
        'Make paste with henna powder and warm water',
        'Let paste develop for 2 hours',
        'Dilute with hot water and strain',
        'Heat solution to 80°C',
        'Add pre-mordanted fabric',
        'Simmer for 45 minutes',
        'Add iron sulfate for darker shade'
      ],
      safetyNotes: [
        'Pure henna is safe but check for adulterants',
        'Iron sulfate requires careful handling'
      ],
      tips: [
        'Fresh henna powder gives better results',
        'Longer steeping intensifies color'
      ]
    },
    {
      id: 11,
      name: 'Ratanjot Purple',
      category: 'roots',
      difficulty: 'Advanced',
      time: '4-6 hours',
      pH: '8-9',
      colorHex: '#663399',
      description: 'Vibrant purple from ratanjot root (Alkanna tinctoria)',
      materials: [
        { item: 'Dried ratanjot root', amount: '150g' },
        { item: 'Wool yarn', amount: '100g' },
        { item: 'Alum mordant', amount: '15g' },
        { item: 'Sodium carbonate', amount: '10g' },
        { item: 'Olive oil', amount: '30ml' },
        { item: 'Water', amount: '4L' }
      ],
      instructions: [
        'Extract color by soaking root in oil for 24 hours',
        'Heat oil gently to 60°C for 2 hours',
        'Strain oil extract and emulsify in water',
        'Add sodium carbonate to raise pH',
        'Add pre-mordanted wool at 70°C',
        'Maintain temperature for 1 hour',
        'Rinse carefully to remove oil residue'
      ],
      safetyNotes: [
        'Oil extraction requires careful temperature control',
        'Ratanjot may cause skin sensitization',
        'Ensure good ventilation when heating oil'
      ],
      tips: [
        'Oil extraction gives more vibrant purples',
        'pH adjustment is crucial for color development'
      ]
    },
    {
      id: 12,
      name: 'Kitewood Yellow-Green',
      category: 'bark',
      difficulty: 'Intermediate',
      time: '3-4 hours',
      pH: '6-7',
      colorHex: '#9ACD32',
      description: 'Fresh yellow-green from kitewood bark and leaves',
      materials: [
        { item: 'Fresh kitewood bark', amount: '300g' },
        { item: 'Cotton fabric', amount: '150g' },
        { item: 'Alum mordant', amount: '25g' },
        { item: 'Copper sulfate', amount: '3g' },
        { item: 'Water', amount: '5L' }
      ],
      instructions: [
        'Chop fresh bark and leaves finely',
        'Boil in water for 1.5 hours',
        'Strain liquid and cool to 70°C',
        'Add pre-mordanted fabric',
        'Maintain temperature for 45 minutes',
        'Add copper sulfate for green shift',
        'Rinse thoroughly when cool'
      ],
      safetyNotes: [
        'Fresh bark may cause skin irritation',
        'Use minimal copper sulfate',
        'Wear gloves when handling materials'
      ],
      tips: [
        'Fresh materials give brightest colors',
        'Iron modifier shifts to olive green'
      ]
    }
  ];

  const [recipes, setRecipes] = useState(sampleRecipes);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'roots', label: 'Roots & Rhizomes' },
    { id: 'leaves', label: 'Leaves & Stems' },
    { id: 'bark', label: 'Bark & Wood' },
    { id: 'fruit', label: 'Fruits & Berries' },
    { id: 'flowers', label: 'Flowers & Petals' }
  ];

  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || recipe.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSaveNotes = useCallback((recipeId, notes) => {
    setSavedNotes(prev => ({
      ...prev,
      [recipeId]: notes
    }));
  }, []);

  const downloadPDF = async (recipe) => {
    setIsGeneratingPDF(true);
    
    try {
      const notes = savedNotes[recipe.id] || '';
      
      // Create HTML content for the PDF
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${recipe.name} - Natural Dye Recipe</title>
    <style>
        @page {
            margin: 1in;
            size: A4;
        }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6; 
            color: #2c3e50;
            font-size: 12px;
        }
        .header { 
            border-bottom: 4px solid ${recipe.colorHex}; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
            text-align: center;
        }
        .title { 
            color: #8b4513; 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 10px; 
        }
        .subtitle {
            color: #cd853f;
            font-size: 14px;
            font-style: italic;
            margin-bottom: 15px;
        }
        .description { 
            color: #a0522d; 
            font-size: 16px;
            margin-bottom: 20px; 
            text-align: center;
        }
        .info-grid { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 15px; 
            margin-bottom: 30px; 
        }
        .info-card { 
            background: #fef7e7; 
            padding: 15px; 
            border-radius: 8px; 
            border: 1px solid ${recipe.colorHex};
            text-align: center;
        }
        .info-title { 
            font-weight: bold; 
            color: #8b4513; 
            margin-bottom: 8px; 
            font-size: 11px;
            text-transform: uppercase;
        }
        .info-value {
            font-size: 14px;
            color: #2c3e50;
            font-weight: 600;
        }
        .section { 
            margin-bottom: 30px; 
            page-break-inside: avoid;
        }
        .section-title { 
            color: #8b4513; 
            font-size: 18px; 
            font-weight: bold; 
            border-bottom: 2px solid ${recipe.colorHex}; 
            padding-bottom: 8px; 
            margin-bottom: 15px; 
            display: flex;
            align-items: center;
        }
        .section-icon {
            margin-right: 10px;
            font-size: 20px;
        }
        .materials-grid { 
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .materials-column {
            background: #fef7e7; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid ${recipe.colorHex};
        }
        .material-item { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            padding: 8px 0; 
            border-bottom: 1px solid #e6d3a3;
        }
        .material-item:last-child {
            border-bottom: none;
        }
        .material-name {
            font-weight: 500;
            color: #2c3e50;
        }
        .material-amount {
            font-weight: bold;
            color: #8b4513;
            background: #fff;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
        }
        .instructions { 
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid ${recipe.colorHex};
        }
        .instructions ol { 
            padding-left: 0;
            counter-reset: step-counter;
        }
        .instructions li { 
            margin-bottom: 15px; 
            line-height: 1.8;
            position: relative;
            padding-left: 40px;
            counter-increment: step-counter;
        }
        .instructions li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            background: ${recipe.colorHex};
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 11px;
        }
        .safety { 
            background: #fef2f2; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #dc2626; 
            margin-bottom: 20px;
        }
        .tips { 
            background: #f0fdf4; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #16a34a; 
        }
        .notes { 
            background: #eff6ff; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #2563eb; 
            margin-top: 20px;
        }
        .color-swatch { 
            display: inline-block; 
            width: 30px; 
            height: 30px; 
            border-radius: 50%; 
            margin-right: 10px; 
            vertical-align: middle; 
            border: 3px solid #8b4513;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
        .warning-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        .warning-icon {
            color: #dc2626;
            margin-right: 8px;
            margin-top: 2px;
        }
        .tip-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        .tip-icon {
            color: #16a34a;
            margin-right: 8px;
            margin-top: 2px;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            color: #6b7280;
            font-size: 10px;
            border-top: 2px solid #e5e7eb;
            padding-top: 20px;
        }
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .notes-content {
            white-space: pre-line;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">${recipe.name}</div>
        <div class="subtitle">Natural Dye Recipe Collection</div>
        <div class="description">${recipe.description}</div>
    </div>

    <div class="info-grid">
        <div class="info-card">
            <div class="info-title">Difficulty</div>
            <div class="info-value">${recipe.difficulty}</div>
        </div>
        <div class="info-card">
            <div class="info-title">Total Time</div>
            <div class="info-value">${recipe.time}</div>
        </div>
        <div class="info-card">
            <div class="info-title">pH Level</div>
            <div class="info-value">${recipe.pH}</div>
        </div>
        <div class="info-card">
            <div class="info-title">Color Result</div>
            <div class="info-value">
                <div>
                    <span class="color-swatch" style="background-color: ${recipe.colorHex};"></span>
                </div>
                <div style="margin-top: 5px; font-size: 10px;">${recipe.colorHex}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">
            <span class="section-icon">📋</span>
            Materials & Ingredients
        </div>
        <div class="materials-grid">
            <div class="materials-column">
                ${recipe.materials.slice(0, Math.ceil(recipe.materials.length / 2)).map(material => 
                    `<div class="material-item">
                        <span class="material-name">${material.item}</span>
                        <span class="material-amount">${material.amount}</span>
                    </div>`
                ).join('')}
            </div>
            <div class="materials-column">
                ${recipe.materials.slice(Math.ceil(recipe.materials.length / 2)).map(material => 
                    `<div class="material-item">
                        <span class="material-name">${material.item}</span>
                        <span class="material-amount">${material.amount}</span>
                    </div>`
                ).join('')}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">
            <span class="section-icon">👩‍🍳</span>
            Step-by-Step Instructions
        </div>
        <div class="instructions">
            <ol>
                ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ol>
        </div>
    </div>

    <div class="two-column">
        <div class="section">
            <div class="section-title">
                <span class="section-icon">⚠️</span>
                Safety Guidelines
            </div>
            <div class="safety">
                ${recipe.safetyNotes.map(note => 
                    `<div class="warning-item">
                        <span class="warning-icon">⚠️</span>
                        <span>${note}</span>
                    </div>`
                ).join('')}
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <span class="section-icon">💡</span>
                Tips & Variations
            </div>
            <div class="tips">
                ${recipe.tips.map(tip => 
                    `<div class="tip-item">
                        <span class="tip-icon">💡</span>
                        <span>${tip}</span>
                    </div>`
                ).join('')}
            </div>
        </div>
    </div>

    ${notes ? `
    <div class="section">
        <div class="section-title">
            <span class="section-icon">📝</span>
            Personal Notes & Observations
        </div>
        <div class="notes">
            <div class="notes-content">${notes}</div>
        </div>
    </div>
    ` : ''}

    <div class="footer">
        <p><strong>DYARY - Natural Dye Recipe Journal</strong></p>
        <p>Generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <p>Keep experimenting and documenting your natural dye journey!</p>
    </div>
</body>
</html>`;

      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${recipe.name.replace(/[^a-zA-Z0-9]/g, '_')}_recipe.html`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show success message
      setTimeout(() => {
        alert('Recipe downloaded as HTML file! Open it in your browser and use Ctrl+P (Cmd+P on Mac) to print or save as PDF.');
      }, 100);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const RecipeCard = ({ recipe }) => (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 border border-amber-100 hover:border-amber-200 transform hover:-translate-y-1"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="h-3" style={{ backgroundColor: recipe.colorHex }}></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-amber-900 leading-tight">{recipe.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[recipe.difficulty]} flex-shrink-0 ml-2`}>
            {recipe.difficulty}
          </span>
        </div>
        <p className="text-amber-700 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        <div className="flex justify-between items-center text-xs text-amber-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            <span>pH {recipe.pH}</span>
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
          <div className="flex gap-2">
            <button
              onClick={() => downloadPDF(recipe)}
              disabled={isGeneratingPDF}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isGeneratingPDF 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? 'Generating...' : 'Download Recipe'}
            </button>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="text-amber-600 hover:text-amber-800 font-medium px-4 py-2"
            >
              ← Back to Recipes
            </button>
          </div>
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

        <NotesSection 
          recipe={recipe} 
          savedNotes={savedNotes}
          onSaveNotes={handleSaveNotes}
          onDownloadPDF={downloadPDF}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="bg-gradient-to-r from-amber-800 to-orange-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">DYARY</h1>
          <p className="text-amber-100 text-sm">Natural Dye Recipe Journal</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedRecipe ? (
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
                      placeholder="Search recipes by name or ingredient..."
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
                </div>
                <div className="text-sm text-amber-600">
                  Showing {filteredRecipes.length} of {recipes.length} recipes
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-amber-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-amber-600 text-lg mb-2">No recipes found</p>
                <p className="text-amber-500 text-sm">Try adjusting your search terms or category filter</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default NaturalDyeJournal;
