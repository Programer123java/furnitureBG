import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id?: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (title: string) => void;
  updateQuantity: (title: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mebeli-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.title === newItem.title);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      }
      
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (title: string) => {
    setItems(currentItems => currentItems.filter(item => item.title !== title));
  };

  const updateQuantity = (title: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.title === title ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};