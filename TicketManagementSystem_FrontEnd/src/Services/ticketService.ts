import axios from "axios";
import { Ticket } from "../types/Ticket";

const API_URL = 'https://localhost:7246/tickets';

export const getTickets = async (page: number, pageSize: number) => {
  const response = await axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const getTicket = async (id: string): Promise<Ticket> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTicket = async (ticket: Omit<Ticket, 'id'>): Promise<Ticket> => {
  const response = await axios.post(API_URL, ticket);
  return response.data;
};

export const updateTicket = async (id: number, ticket: Ticket): Promise<Ticket> => {
  const response = await axios.put(`${API_URL}/${id}`, ticket);
  return response.data;
};

export const deleteTicket = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};