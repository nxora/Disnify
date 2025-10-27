import React, { useEffect, useState } from 'react';

function DisneyCharacters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.disneyapi.dev/character');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setCharacters(data.data);
        setFilteredCharacters(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const results = characters.filter((char) =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(results);
  }, [searchTerm, characters]);

  if (loading) return <div className="text-center py-12 text-xl text-gray-300">Loading Disney magic... ✨</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
          Disney Character Explorer
        </h1>
        <p className="mt-2 text-gray-400">Discover your favorite heroes, villains, and sidekicks</p>
      </header>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
          />
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* Character Grid */}
      <main className="px-4 pb-12">
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No characters found. Try another search!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredCharacters.map((char) => (
              <div
                key={char._id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700"
              >
                {char.imageUrl ? (
                  <img
                    src={char.imageUrl}
                    alt={char.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate">{char.name}</h3>
                  {char.films && char.films.length > 0 && (
                    <p className="text-sm text-blue-400 mt-1">
                      <span className="font-medium">Films:</span> {char.films.slice(0, 2).join(', ')}
                      {char.films.length > 2 && '...'}
                    </p>
                  )}
                  {char.tvShows && char.tvShows.length > 0 && (
                    <p className="text-sm text-purple-400 mt-1">
                      <span className="font-medium">TV:</span> {char.tvShows.slice(0, 2).join(', ')}
                      {char.tvShows.length > 2 && '...'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold">
              &copy; {new Date().getFullYear()} Nexora. All Rights Reserved.
            </p>
            <p className="text-sm text-gray-400">Made with 💙 by <span className="text-blue-400">Nexora</span></p>
          </div>
          <div className="flex gap-5 text-xl">
            <a
              href="https://www.facebook.com/davex.1011"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-500 hover:text-blue-400 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.github.com/nxora"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-300 hover:text-white transition"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.snapchat.com/@davex.101"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Snapchat"
              className="text-yellow-400 hover:text-yellow-300 transition"
            >
              <i className="fab fa-snapchat-ghost"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DisneyCharacters;