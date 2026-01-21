
import React from 'react';

const Marketplace: React.FC = () => {
  const products = [
    { id: 1, name: 'Premium Organic Seeds', price: '$24.99', img: 'https://picsum.photos/seed/seeds/400/300', category: 'Seeds' },
    { id: 2, name: 'Smart N-P-K Sensor', price: '$129.00', img: 'https://picsum.photos/seed/sensor/400/300', category: 'Tech' },
    { id: 3, name: 'Eco-Friendly Fertilizer', price: '$45.50', img: 'https://picsum.photos/seed/fertilizer/400/300', category: 'Supplies' },
    { id: 4, name: 'Solar Watering System', price: '$299.99', img: 'https://picsum.photos/seed/water/400/300', category: 'Tech' },
    { id: 5, name: 'Pest Resistance Kit', price: '$18.00', img: 'https://picsum.photos/seed/pest/400/300', category: 'Supplies' },
    { id: 6, name: 'Heirloom Tomato Seeds', price: '$12.00', img: 'https://picsum.photos/seed/tomato/400/300', category: 'Seeds' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-3xl font-bold text-gray-900">Agro Marketplace</h3>
        <div className="flex gap-2">
          {['All', 'Seeds', 'Tech', 'Supplies'].map(cat => (
            <button key={cat} className={`px-4 py-1 rounded-full text-sm font-medium ${cat === 'All' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="relative aspect-video overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700">
                {p.category}
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-gray-800 text-lg mb-1">{p.name}</h4>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-bold text-xl">{p.price}</span>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
