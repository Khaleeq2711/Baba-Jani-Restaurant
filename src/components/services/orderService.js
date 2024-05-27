import axios from "axios";

const firebaseUrl =
  "https://baba-jani-a1d23-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const getOrders = async () => {
  try {
    const response = await axios.get(`${firebaseUrl}/orders.json`);
    return response.data;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
};
export const sendOrder = async (orderData) => {
  try {
    const response = await axios.post(`${firebaseUrl}/orders.json`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error sending order:", error);
    throw error;
  }
};
export const updateShopStatus = async (s) => {
  try {
    const response = await axios.put(`${firebaseUrl}/shop.json`, s);
    return response.data;
  } catch (error) {
    console.error("Error updating shop status:", error);
    throw error;
  }
};
export const getShopStatus = async () => {
  try {
    const response = await axios.get(`${firebaseUrl}/shop.json`);
    return response.data;
  } catch (error) {
    console.error("Error getting Shop Status:", error);
    throw error;
  }
};
export const getShopOrders = async () => {
  try {
    const response = await axios.get(`${firebaseUrl}/shopOrders.json`);
    return response.data;
  } catch (error) {
    console.error("Error getting Shop orders:", error);
    throw error;
  }
};
export const sendShopOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${firebaseUrl}/shopOrders.json`,
      orderData
    );
    return response.data;
  } catch (error) {
    console.error("Error sending Shop order:", error);
    throw error;
  }
};

export const getInventory = async () => {
  try {
    const response = await axios.get(`${firebaseUrl}/inventory.json`);
    return response.data;
  } catch (error) {
    console.error("Error getting Invetory Items:", error);
    throw error;
  }
};
export const sendInventory = async (items) => {
  try {
    const response = await axios.post(`${firebaseUrl}/inventory.json`, items);
    return response.data;
  } catch (error) {
    console.error("Error sending Inventory Items:", error);
    throw error;
  }
};
// Function to delete an order from Firebase
// export const deleteOrder = async (orderId) => {
//   try {
//     const response = await axios.delete(
//       `${firebaseUrl}/orders/${orderId}.json`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting order:", error);
//     throw error;
//   }
// };
