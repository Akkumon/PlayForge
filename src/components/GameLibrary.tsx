import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Play } from 'lucide-react';
import { useTiltEffect } from '../hooks/useTiltEffect';

interface Game {
  id: string;
  title: string;
  genre: string;
  image: string;
  rating: number;
  releaseYear: number;
}

const games: Game[] = [
  {
    id: '1',
    title: 'Cyber Nexus',
    genre: 'Action RPG',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2940',
    rating: 4.8,
    releaseYear: 2024,
  },
  {
    id: '2',
    title: 'Stellar Odyssey',
    genre: 'Space Simulation',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=2940',
    rating: 4.6,
    releaseYear: 2024,
  },
  {
    id: '3',
    title: 'Mystic Realms',
    genre: 'Fantasy MMO',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2940',
    rating: 4.9,
    releaseYear: 2023,
  },
  {
    id: '4',
    title: 'Speed Warriors',
    genre: 'Racing',
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=2940',
    rating: 4.5,
    releaseYear: 2024,
  },
  {
    id: '5',
    title: 'Tactical Force',
    genre: 'Strategy',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&q=80&w=2940',
    rating: 4.7,
    releaseYear: 2023,
  },
];

const genres = ['All', 'Action RPG', 'Space Simulation', 'Fantasy MMO', 'Racing', 'Strategy'];

export default function GameLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'releaseYear'>('rating');

  const filteredGames = useMemo(() => {
    return games
      .filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedGenre === 'All' || game.genre === selectedGenre)
      )
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [searchQuery, selectedGenre, sortBy]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-6 font-press-start-2p text-3xl sm:text-4xl leading-relaxed">
            Game Library
          </h2>
          <p className="text-gray-400 text-lg">
            Explore our extensive collection of premium games available for instant play.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E2537] text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[#1E2537] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'releaseYear')}
              className="bg-[#1E2537] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="rating">Top Rated</option>
              <option value="releaseYear">Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => {
            const { tiltStyle, onMouseMove, onMouseLeave } = useTiltEffect({
              max: 8,
              scale: 1.02,
              speed: 400,
            });

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                transition={{ duration: 0.3 }}
                className="group bg-[#0f1729] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                style={tiltStyle}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">{game.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">{game.genre}</span>
                    <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">★ {game.rating}</span>
                  </div>
                  <motion.a
                    href="#hero"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Play className="w-4 h-4" />
                    Play Now
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}