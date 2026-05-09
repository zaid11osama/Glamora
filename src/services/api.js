// ============================================================
// Mock API Service for Glamora
// All functions return Promises and simulate real API delays
// Replace these implementations with real API calls later
// ============================================================

import { mockArtists, mockBookings } from '../data/mockData.js'

// Simulated network delay
const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms))

// ============================================================
// Auth API
// ============================================================

/**
 * Simulate user login
 * TODO: Replace with POST /api/auth/login
 */
export async function loginUser({ phone, password, role }) {
  await delay(1000)
  // Mock validation
  if (!phone || !password) {
    throw new Error('رقم الهاتف وكلمة المرور مطلوبان')
  }
  if (password.length < 6) {
    throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
  }
  // Mock response based on role
  if (role === 'artist') {
    return {
      token: 'mock_artist_token_xyz',
      user: {
        id: 1,
        name: 'سارة الأحمدي',
        businessName: 'ستوديو سارة للميكب',
        phone,
        role: 'artist',
        artistId: 1,
      },
    }
  }
  return {
    token: 'mock_customer_token_abc',
    user: {
      id: 101,
      name: 'لجين المطيري',
      phone,
      role: 'customer',
    },
  }
}

/**
 * Simulate customer registration
 * TODO: Replace with POST /api/auth/register/customer
 */
export async function registerCustomer({ name, phone, city, area, password }) {
  await delay(1200)
  if (!name || !phone || !city || !password) {
    throw new Error('جميع الحقول المطلوبة يجب تعبئتها')
  }
  return {
    success: true,
    message: 'تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول',
    user: {
      id: Math.floor(Math.random() * 10000),
      name,
      phone,
      city,
      area,
      role: 'customer',
    },
  }
}

/**
 * Simulate makeup artist registration
 * TODO: Replace with POST /api/auth/register/artist
 */
export async function registerArtist({
  businessName,
  ownerName,
  phone,
  city,
  area,
  providesHomeService,
  avgPrice,
  bio,
  password,
}) {
  await delay(1200)
  if (!businessName || !ownerName || !phone || !city || !password) {
    throw new Error('جميع الحقول المطلوبة يجب تعبئتها')
  }
  return {
    success: true,
    message: 'تم تسجيل حسابك كميكب آرتست! سيتم مراجعة طلبك خلال 24 ساعة',
    artist: {
      id: Math.floor(Math.random() * 10000),
      businessName,
      name: ownerName,
      phone,
      city,
      area,
      providesHomeService,
      startingPrice: avgPrice,
      bio,
      role: 'artist',
    },
  }
}

// ============================================================
// Artists API
// ============================================================

/**
 * Get all artists with optional pagination
 * TODO: Replace with GET /api/artists?page=&limit=
 */
export async function getArtists({ page = 1, limit = 8 } = {}) {
  await delay(700)
  const start = (page - 1) * limit
  const end = start + limit
  return {
    artists: mockArtists.slice(start, end),
    total: mockArtists.length,
    page,
    totalPages: Math.ceil(mockArtists.length / limit),
  }
}

/**
 * Get a single artist by ID
 * TODO: Replace with GET /api/artists/:id
 */
export async function getArtistById(id) {
  await delay(600)
  const artist = mockArtists.find((a) => a.id === parseInt(id))
  if (!artist) {
    throw new Error('لم يتم العثور على الميكب آرتست')
  }
  return artist
}

/**
 * Search and filter artists
 * TODO: Replace with GET /api/artists/search?city=&area=&date=&type=&minPrice=&maxPrice=
 */
export async function searchArtists(filters = {}) {
  await delay(900)
  let results = [...mockArtists]

  if (filters.city) {
    results = results.filter((a) => a.city === filters.city)
  }

  if (filters.area) {
    results = results.filter((a) => a.area === filters.area)
  }

  if (filters.serviceType === 'home') {
    results = results.filter((a) => a.providesHomeService)
  } else if (filters.serviceType === 'studio') {
    results = results.filter((a) => a.providesStudioService)
  }

  if (filters.minPrice) {
    results = results.filter((a) => a.startingPrice >= parseInt(filters.minPrice))
  }

  if (filters.maxPrice) {
    results = results.filter((a) => a.startingPrice <= parseInt(filters.maxPrice))
  }

  if (filters.date) {
    results = results.filter((a) => a.availableDates.includes(filters.date))
  }

  if (filters.sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating)
  } else if (filters.sortBy === 'price_asc') {
    results.sort((a, b) => a.startingPrice - b.startingPrice)
  } else if (filters.sortBy === 'price_desc') {
    results.sort((a, b) => b.startingPrice - a.startingPrice)
  } else if (filters.sortBy === 'reviews') {
    results.sort((a, b) => b.reviewsCount - a.reviewsCount)
  }

  return {
    artists: results,
    total: results.length,
  }
}

// ============================================================
// Bookings API
// ============================================================

/**
 * Create a new booking
 * TODO: Replace with POST /api/bookings
 */
export async function createBooking({
  artistId,
  serviceId,
  date,
  time,
  locationType,
  notes,
  paymentMethod,
}) {
  await delay(1000)
  if (!artistId || !serviceId || !date || !time) {
    throw new Error('يرجى تعبئة جميع بيانات الحجز')
  }
  const newBooking = {
    id: Math.floor(Math.random() * 99999),
    artistId: parseInt(artistId),
    serviceId,
    date,
    time,
    locationType,
    notes,
    paymentMethod,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }
  return {
    success: true,
    message: 'تم تأكيد حجزك بنجاح!',
    booking: newBooking,
  }
}

/**
 * Get bookings for a specific artist
 * TODO: Replace with GET /api/artists/:id/bookings
 */
export async function getArtistBookings(artistId) {
  await delay(700)
  const bookings = mockBookings.filter((b) => b.artistId === parseInt(artistId))
  return {
    bookings,
    total: bookings.length,
  }
}

/**
 * Get bookings for a customer
 * TODO: Replace with GET /api/customers/:id/bookings
 */
export async function getCustomerBookings(customerId) {
  await delay(700)
  const bookings = mockBookings.filter((b) => b.customerId === parseInt(customerId))
  return { bookings, total: bookings.length }
}

/**
 * Cancel a booking
 * TODO: Replace with PATCH /api/bookings/:id/cancel
 */
export async function cancelBooking(bookingId) {
  await delay(800)
  return {
    success: true,
    message: 'تم إلغاء الحجز بنجاح',
    bookingId,
  }
}

// ============================================================
// Artist Profile API
// ============================================================

/**
 * Update artist profile
 * TODO: Replace with PATCH /api/artists/:id
 */
export async function updateArtistProfile(artistId, profileData) {
  await delay(1000)
  return {
    success: true,
    message: 'تم تحديث الملف الشخصي بنجاح',
    artist: {
      id: artistId,
      ...profileData,
      updatedAt: new Date().toISOString(),
    },
  }
}

/**
 * Upload portfolio image (mock)
 * TODO: Replace with POST /api/artists/:id/portfolio (multipart form)
 */
export async function uploadPortfolioImage(artistId, file) {
  await delay(1500)
  return {
    success: true,
    message: 'تم رفع الصورة بنجاح',
    imageUrl: `https://picsum.photos/seed/${Date.now()}/400/500`,
  }
}

// ============================================================
// Admin API
// ============================================================

/**
 * Get admin overview stats
 * TODO: Replace with GET /api/admin/stats
 */
export async function getAdminStats() {
  await delay(800)
  return {
    totalUsers: 1248,
    totalArtists: 87,
    totalBookings: 3456,
    totalRevenue: 287450,
    pendingArtists: 12,
    activeBookingsToday: 24,
    monthlyGrowth: 18.5,
    topCities: [
      { city: 'الرياض', bookings: 1240 },
      { city: 'جدة', bookings: 890 },
      { city: 'الدمام', bookings: 420 },
    ],
  }
}
