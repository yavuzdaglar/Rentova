document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    let allCars = [];
    let filteredCars = [];
    let currentPage = 1;
    const itemsPerPage = 36;

    const filters = {
        search: '',
        brand: 'Hepsi',
        category: 'Hepsi',
        transmission: 'Hepsi',
        fuel: 'Hepsi',
        seats: 'Hepsi'
    };

    // --- DOM Elements ---
    const carGrid = document.getElementById('productCarGrid');
    const paginationRoot = document.getElementById('productPagination');
    const noResults = document.getElementById('noResults');
    const searchInput = document.getElementById('carSearchInput');
    const resetBtn = document.getElementById('resetFiltersBtn');

    function toNumber(value, fallback = 0) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    function normalizeCar(source) {
        if (!source) return null;

        const read = (...keys) => {
            for (const key of keys) {
                const value = source[key];
                if (value !== undefined && value !== null) return value;
            }
            return null;
        };

        const carId = parseInt(read('carId', 'CarId') || '0', 10);

        return {
            carId: Number.isFinite(carId) ? carId : 0,
            carModel: read('carModel', 'CarModel', 'model') || '',
            brandName: read('brandName', 'BrandName', 'brand') || '',
            vehicleTypeName: read('vehicleTypeName', 'VehicleTypeName', 'category') || '',
            transmissionTypeName: read('transmissionTypeName', 'TransmissionTypeName', 'transmission') || '',
            fuelTypeName: read('fuelTypeName', 'FuelTypeName', 'fuel') || '',
            seatCountName: read('seatCountName', 'SeatCountName', 'seats') || '',
            dailyPrice: toNumber(read('dailyPrice', 'DailyPrice', 'price')),
            carImage: read('carImage', 'CarImage', 'imageUrl') || ''
        };
    }

    // --- Initialization ---
    function init() {
        // 1. First, try to get existing data from the DOM as a fallback
        const existingItems = document.querySelectorAll('.car-item');
        if (existingItems.length > 0) {
            allCars = Array.from(existingItems).map(el => normalizeCar({
                carId: parseInt(el.dataset.carId || '0', 10),
                carModel: el.dataset.model || '',
                brandName: el.dataset.brand || '',
                vehicleTypeName: el.dataset.category || '',
                transmissionTypeName: el.dataset.transmission || '',
                fuelTypeName: el.dataset.fuel || '',
                seatCountName: el.dataset.seats || '',
                dailyPrice: parseFloat(el.dataset.price || '0'),
                carImage: el.querySelector('img').src,
            })).filter(car => car && car.carId > 0);
            applyFilters();
        }

        // 2. Then try to fetch fresh data from API
        fetchCars();
        
        // 3. Initialize UI logic
        initFilterLogic();
        initSearchLogic();
        initResetLogic();
    }

    async function fetchCars() {
        try {
            const response = await fetch('http://localhost:5234/api/Cars/getall');
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    const normalizedCars = data
                        .map(normalizeCar)
                        .filter(car => car && car.carId > 0);

                    if (normalizedCars.length > 0) {
                        allCars = normalizedCars;
                    }

                    applyFilters();
                    console.log('API data loaded:', allCars.length);
                }
            }
        } catch (error) {
            console.warn('API fetch failed, using DOM data if available:', error);
        }
    }

    function initFilterLogic() {
        document.querySelectorAll('.filter-select').forEach(filterDiv => {
            const label = filterDiv.dataset.label;
            const btn = filterDiv.querySelector('button');
            const dropdown = filterDiv.querySelector('.filter-dropdown');
            const span = btn.querySelector('span');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = dropdown.classList.contains('hidden');
                closeAllDropdowns();
                if (isHidden) {
                    dropdown.classList.remove('hidden');
                    const ds = dropdown.querySelector('.dropdown-search');
                    if (ds) ds.focus();
                }
            });

            // Local search inside dropdown
            const dsInput = dropdown.querySelector('.dropdown-search');
            if (dsInput) {
                dsInput.addEventListener('input', (e) => {
                    const searchVal = e.target.value.toUpperCase();
                    dropdown.querySelectorAll('.option-btn').forEach(optBtn => {
                        const text = optBtn.textContent.toUpperCase();
                        optBtn.classList.toggle('hidden', !text.includes(searchVal));
                    });
                });
            }

            // Option selection
            dropdown.querySelectorAll('.option-btn').forEach(optBtn => {
                optBtn.addEventListener('click', () => {
                    const val = optBtn.dataset.value;
                    const isAll = isHepsi(val);
                    
                    span.textContent = val;
                    span.classList.toggle('text-brand-anthracite/40', isAll);
                    span.classList.toggle('text-brand-black', !isAll);
                    
                    const filterKey = getFilterKey(label);
                    filters[filterKey] = val; // Store exact value or 'Hepsi'
                    
                    currentPage = 1;
                    applyFilters();
                    dropdown.classList.add('hidden');
                });
            });
        });
    }

    function initSearchLogic() {
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                filters.search = e.target.value;
                currentPage = 1;
                applyFilters();
            });
        }
    }

    function initResetLogic() {
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                filters.search = '';
                filters.brand = 'Hepsi';
                filters.category = 'Hepsi';
                filters.transmission = 'Hepsi';
                filters.fuel = 'Hepsi';
                filters.seats = 'Hepsi';
                
                if (searchInput) searchInput.value = '';
                
                document.querySelectorAll('.filter-select').forEach(div => {
                    const span = div.querySelector('button span');
                    span.textContent = 'Hepsi';
                    span.className = 'text-brand-anthracite/40';
                });

                currentPage = 1;
                applyFilters();
            });
        }
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.add('hidden'));
    }

    document.addEventListener('click', closeAllDropdowns);

    // --- Core Logic ---
    function applyFilters() {
        if (!allCars || allCars.length === 0) return;

        const searchQ = (filters.search || '').toUpperCase();
        
        filteredCars = allCars.filter(car => {
            // 1. Search Match
            const mModel = (car.carModel || '').toUpperCase();
            const mBrand = (car.brandName || '').toUpperCase();
            const matchesSearch = mModel.includes(searchQ) || mBrand.includes(searchQ);
            
            // 2. Dropdown Matches
            const matchesBrand = isHepsi(filters.brand) || 
                               (car.brandName || '').toUpperCase() === filters.brand.toUpperCase();
            
            const matchesCategory = isHepsi(filters.category) || 
                                  (car.vehicleTypeName || '').toUpperCase() === filters.category.toUpperCase();
            
            const matchesTransmission = isHepsi(filters.transmission) || 
                                      (car.transmissionTypeName || '').toUpperCase() === filters.transmission.toUpperCase();
            
            const matchesFuel = isHepsi(filters.fuel) || 
                              (car.fuelTypeName || '').toUpperCase() === filters.fuel.toUpperCase();
            
            // Special handling for seats
            const carSeats = (car.seatCountName || '').toUpperCase().replace(' KOLTUK', '').trim();
            const filterSeats = isHepsi(filters.seats) ? null : filters.seats.toUpperCase().replace(' KOLTUK', '').trim();
            const matchesSeats = filterSeats === null || carSeats === filterSeats;

            return matchesSearch && matchesBrand && matchesCategory && matchesTransmission && matchesFuel && matchesSeats;
        });

        renderGrid();
        renderPagination();
    }

    function renderGrid() {
        if (!carGrid) return;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageCars = filteredCars.slice(start, end);

        if (pageCars.length === 0) {
            carGrid.innerHTML = '';
            if (noResults) noResults.classList.remove('hidden');
            return;
        }

        if (noResults) noResults.classList.add('hidden');
        carGrid.innerHTML = pageCars.map(car => {
            const reservationUrl = car.carId > 0 ? `/Reservation/Index?carId=${car.carId}` : '/Reservation/Index';

            return `
            <div class="group bg-white rounded-[2rem] border border-brand-gray/30 overflow-hidden hover:shadow-xl transition-all duration-500 opacity-0 translate-y-4 animate-in">
                <div class="relative aspect-[16/10] overflow-hidden">
                    <a href="${reservationUrl}" class="block w-full h-full" aria-label="${car.carModel || 'Araç'} için rezervasyon sayfasına git">
                        <img src="${car.carImage || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'}" 
                             alt="${car.carModel}" 
                             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                             onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'"/>
                    </a>
                    <div class="absolute top-4 left-4">
                        <span class="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider border border-brand-gray/20">${car.vehicleTypeName || 'Araç'}</span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="mb-4">
                        <p class="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest mb-1">${car.brandName || ''}</p>
                        <h3 class="text-xl font-display font-bold truncate">${car.carModel || 'İsimsiz Araç'}</h3>
                    </div>
                    <div class="grid grid-cols-3 gap-2 mb-4">
                        <div class="flex items-center gap-1.5 text-[8px] font-bold text-brand-anthracite/40 uppercase">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22L17 22L17 11L13 7L13 2L4 2L4 7L3 11L3 22Z"/><path d="M13 11L17 11"/><path d="M4 11L8 11"/></svg> ${car.fuelTypeName || '-'}
                        </div>
                        <div class="flex items-center gap-1.5 text-[8px] font-bold text-brand-anthracite/40 uppercase">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${car.transmissionTypeName || '-'}
                        </div>
                        <div class="flex items-center gap-1.5 text-[8px] font-bold text-brand-anthracite/40 uppercase">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> ${car.seatCountName || '-'}
                        </div>
                    </div>
                    <div class="flex justify-between items-end pt-4 border-t border-brand-gray/20">
                        <div>
                            <p class="text-lg font-display font-bold">${(car.dailyPrice || 0).toLocaleString('tr-TR')} TL</p>
                            <p class="text-[9px] font-bold text-brand-anthracite/40 uppercase tracking-widest">/ Gün</p>
                        </div>
                        <a href="${reservationUrl}" class="p-3 bg-brand-light group-hover:bg-brand-black group-hover:text-white rounded-xl transition-all" aria-label="Aracı rezerve et">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
        }).join('');

        // Trigger animations
        setTimeout(() => {
            carGrid.querySelectorAll('.animate-in').forEach((el, i) => {
                setTimeout(() => {
                    el.classList.remove('opacity-0', 'translate-y-4');
                }, i * 50);
            });
        }, 10);
    }

    function renderPagination() {
        if (!paginationRoot) return;
        const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
        if (totalPages <= 1) {
            paginationRoot.innerHTML = '';
            paginationRoot.classList.add('hidden');
            return;
        }

        paginationRoot.classList.remove('hidden');
        let html = `
            <button class="w-12 h-12 rounded-full border border-brand-gray/30 flex items-center justify-center hover:bg-brand-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-black transition-all prev-btn" ${currentPage === 1 ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="flex gap-2">
        `;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button class="w-12 h-12 rounded-full font-bold text-sm transition-all page-btn ${currentPage === i ? 'bg-brand-black text-white' : 'hover:bg-brand-light'}" data-page="${i}">
                    ${i}
                </button>
            `;
        }

        html += `
            </div>
            <button class="w-12 h-12 rounded-full border border-brand-gray/30 flex items-center justify-center hover:bg-brand-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-black transition-all next-btn" ${currentPage === totalPages ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
        `;

        paginationRoot.innerHTML = html;

        // Reset listeners
        paginationRoot.querySelector('.prev-btn').onclick = () => {
            currentPage--;
            applyFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        paginationRoot.querySelector('.next-btn').onclick = () => {
            currentPage++;
            applyFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        paginationRoot.querySelectorAll('.page-btn').forEach(btn => {
            btn.onclick = () => {
                currentPage = parseInt(btn.dataset.page);
                applyFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        });
    }

    // --- Helpers ---
    function getFilterKey(label) {
        switch(label) {
            case 'Marka': return 'brand';
            case 'Kategori': return 'category';
            case 'Vites Türü': return 'transmission';
            case 'Yakıt Türü': return 'fuel';
            case 'Koltuk Sayısı': return 'seats';
            default: return '';
        }
    }

    function isHepsi(val) {
        if (!val) return true;
        const v = val.toUpperCase();
        return v === 'HEPSİ' || v === 'HEPSI';
    }

    // Run!
    init();
});
