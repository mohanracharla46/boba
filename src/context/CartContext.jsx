/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

/* --- Cart Context ------------------------------------------------------- */
// Provides cart state and actions to every page without prop-drilling.
// Usage: wrap your tree in <CartProvider>, then call useCart() in any child.

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  /* Add or increment a customized food/drink item */
  const addToCart = (item, customizations, quantity) => {
    const activeAddonsList = Object.entries(customizations.addons || {})
      .filter(([, checked]) => checked)
      .map(([key]) => key)
      .sort()
      .join(',')
    const customKey = `${item.id}-${customizations.spiceLevel || ''}-${customizations.protein || ''}-${activeAddonsList}-${customizations.sweetness || ''}-${customizations.entree || ''}`

    setCart((prev) => {
      const idx = prev.findIndex((i) => i.customKey === customKey)
      if (idx > -1) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
        return next
      }
      return [...prev, { customKey, item, customizations: { ...customizations }, quantity }]
    })
  }

  /* Change the quantity of an existing item (0 = remove) */
  const updateCartItemQuantity = (customKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(customKey)
      return
    }
    setCart((prev) => prev.map((i) => (i.customKey === customKey ? { ...i, quantity: newQty } : i)))
  }

  /* Remove a single item */
  const removeFromCart = (customKey) => {
    setCart((prev) => prev.filter((i) => i.customKey !== customKey))
  }

  /* Wipe the cart (used after successful checkout) */
  const clearCart = () => setCart([])

  /* Convenience: total number of individual drinks */
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateCartItemQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

/* Hook for easy consumption */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
