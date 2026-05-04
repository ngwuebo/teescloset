export type CartItem = {
  lineId: string;
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor?: string;
};

const CART_KEY = "teescloset-cart";

function dispatchCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export function openCartDrawer() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("openCartDrawer"));
  }
}

export function closeCartDrawer() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("closeCartDrawer"));
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCartItemCount(cart: CartItem[]) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function addToCart(item: Omit<CartItem, "lineId">) {
  const cart = getCart();
  const lineId = `${item.id}-${item.selectedColor || "default"}`;

  const existing = cart.find((product) => product.lineId === lineId);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({
      ...item,
      lineId,
    });
  }

  saveCart(cart);
  dispatchCartUpdated();
  openCartDrawer();
}

export function getCartTotal(cart: CartItem[]) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function removeFromCart(lineId: string) {
  const cart = getCart().filter((item) => item.lineId !== lineId);
  saveCart(cart);
  dispatchCartUpdated();
}

export function increaseQuantity(lineId: string) {
  const cart = getCart();
  const item = cart.find((p) => p.lineId === lineId);

  if (item) {
    item.quantity += 1;
    saveCart(cart);
    dispatchCartUpdated();
  }
}

export function decreaseQuantity(lineId: string) {
  const cart = getCart();
  const item = cart.find((p) => p.lineId === lineId);

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    const updatedCart = cart.filter((p) => p.lineId !== lineId);
    saveCart(updatedCart);
    dispatchCartUpdated();
    return;
  }

  saveCart(cart);
  dispatchCartUpdated();
}