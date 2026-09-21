'use client'

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import type { Format, Product } from '@/data/products'

export interface CartItem {
  product: Product
  format: Format
  isLot: boolean
  quantity: number
  unitPrice: number
  frameColor?: string // ex: 'Bois naturel', 'Noir', 'Doré', 'Blanc'
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  // Devient true une fois la lecture du panier sauvegardé (localStorage) terminée.
  // Tant que c'est false, on n'écrit rien pour éviter d'écraser un panier existant
  // avec le tableau vide de l'état initial.
  hydrated: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; format: Format; isLot: boolean } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; format: Format; isLot: boolean; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = `${action.payload.product.id}-${action.payload.format}-${action.payload.isLot}`
      const existing = state.items.findIndex(
        (i) => `${i.product.id}-${i.format}-${i.isLot}` === key
      )
      if (existing >= 0) {
        const updated = [...state.items]
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.payload.quantity,
        }
        return { ...state, items: updated }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.payload.productId &&
              i.format === action.payload.format &&
              i.isLot === action.payload.isLot
            )
        ),
      }
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId &&
          i.format === action.payload.format &&
          i.isLot === action.payload.isLot
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'HYDRATE':
      return { ...state, items: action.payload, hydrated: true }
    default:
      return state
  }
}

const CART_STORAGE_KEY = 'huruf_cart'

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string, format: Format, isLot: boolean) => void
  updateQuantity: (productId: string, format: Format, isLot: boolean, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false, hydrated: false })

  // Restaure le panier sauvegardé au premier chargement (une seule fois).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      const items = saved ? JSON.parse(saved) : []
      dispatch({ type: 'HYDRATE', payload: Array.isArray(items) ? items : [] })
    } catch {
      // Navigation privée / stockage bloqué / données corrompues : on repart d'un panier vide.
      dispatch({ type: 'HYDRATE', payload: [] })
    }
  }, [])

  // Sauvegarde à chaque changement, mais seulement après la restauration ci-dessus
  // (sinon on écraserait un panier existant avec le tableau vide de l'état initial).
  useEffect(() => {
    if (!state.hydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // Navigation privée / stockage plein ou bloqué : le panier reste utilisable pour la session.
    }
  }, [state.items, state.hydrated])

  const addItem = useCallback((item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item }), [])
  const removeItem = useCallback(
    (productId: string, format: Format, isLot: boolean) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { productId, format, isLot } }),
    []
  )
  const updateQuantity = useCallback(
    (productId: string, format: Format, isLot: boolean, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, format, isLot, quantity } }),
    []
  )
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
