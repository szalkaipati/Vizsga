import { useEffect, useRef, useState } from 'react';
import './search.css';

function Search() {
    const [searchQuery, setSearchQuery]= useState("");
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    //const openPopup = () => setIsOpen(true);
    
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Keresés: ${searchQuery}`);
    setIsOpen(true);
    
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [isOpen]);

  return (
    <><form onSubmit={handleSearch}>
     <input type="text" value={searchQuery} onChange ={(e) => setSearchQuery(e.target.value)} name="search" id="search" placeholder="Keresés..."/>
     
    <div className="search-button" >
      <button >
        search
        {//<img src="/searchIcon.png" alt="Keresés" className="search-icon"/>
        }
        </button>
      </div>
     </form>
     {isOpen && (
        <div className="search-popup" ref={popupRef}>
          <div className="popup-content">
            <p>Eredmény: <strong>{searchQuery}</strong></p>
          </div>
        </div>
      )}
 </>
  );
};

export default Search;
